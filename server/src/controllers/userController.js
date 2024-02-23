import User from "../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sharp from "sharp";
import Post from "../models/post.js";
import { uploadFile } from "../helpers/s3.js";

const FRONTEND_URL = process.env.FRONTEND_URL;

const transport = nodemailer.createTransport({
  service: "yandex",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

//Create User
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const verificationToken = await user.generateVerificationToken();
    user.verificationToken = verificationToken;
    const savedUser = await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: "Click the link below to verify your email.",
      html: `<a href="${FRONTEND_URL}/verify/${verificationToken}">Verify Email</a>`,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Mail sent: " + info.response);
        // res.send("Reset email send");
      }
    });

    res
      .status(201)
      .send(
        "User Successfully Registered! Verify Email Send. Please Check Your Email."
      );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json("User Successfully Updated!");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

// Controller function for verifying the token
export const verifyToken = async (req, res) => {
  const token = req.params.token;
  console.log(typeof token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already verified
    if (user.verified) {
      return res.status(400).json({ error: "User is already verified" });
    }
    // Update user verification status
    user.verified = true;
    user.verificationToken = " "; // Clear verification token
    console.log(user);
    await user.save();

    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        error: "Token has expired. Please request a new verification link.",
      });
    }

    console.error(error);
    res.status(400).json({ error: "Invalid token" });
  }
};

// Login endpoint handler
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist or password is incorrect, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If user is not verified, return error
    if (!user.verified) {
      return res.status(401).json({ error: "User is not verified" });
    }

    // Generate JWT token
    const token = user.generateToken();

    // Return token and user details
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      message: "Login Successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const createPost = async (req, res) => {
  try {
    const file = req.file;
    const caption = req.body.caption;
    const token = req.body.token;

    // Check if token is provided
    if (!token) {
      return res.status(400).send("Token is missing");
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send("Invalid token");
    }

    const imageName = generateFileName();

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1080, width: 1080, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    // Create the post
    const post = new Post({
      user: decoded._id,
      imageName,
      caption,
    });

    await post.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(decoded._id, { $push: { posts: post._id } });

    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
};




