import User from "../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sharp from "sharp";
import Post from "../models/post.js";
import { getObjectSignedUrl, uploadFile } from "../helpers/s3.js";

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
      subject: "Verify Your Email Address",
      text: "Welcome to our platform! To get started, please verify your email address by clicking the button below.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #007bff;">Welcome to Our Platform!</h2>
          <p style="font-size: 16px;">To get started, please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${FRONTEND_URL}/verify/${verificationToken}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 18px; display: inline-block;">Verify Email</a>
          </div>
          <p style="font-size: 14px; margin-top: 20px;">If you're unable to click the button above, you can also verify your email by copying and pasting the following link into your browser:</p>
          <p style="font-size: 14px;"><a href="${FRONTEND_URL}/verify/${verificationToken}" style="color: #007bff; text-decoration: none;">${FRONTEND_URL}/verify/${verificationToken}</a></p>
          <p style="font-size: 14px;">Thank you for joining us!</p>
          <p style="font-size: 14px;">- The Our Platform Team</p>
        </div>
      `,
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
    // Find the user by ID and populate the 'posts' and 'savedPosts' arrays
    const user = await User.findById(req.params.userId)
      .populate({
        path: 'posts',
        options: { sort: { createdAt: -1 } } // Sort posts by createdAt field in descending order
      })
      .populate('savedPosts');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add imageUrl to each post in the 'posts' array
    for (let post of user.posts) {
      post.imageUrl = await getObjectSignedUrl(post.imageName);

      // Check if the current user is the author of the post

      // Check if the post is saved by the user
      post.isSaved = user.savedPosts.includes(post._id);

      
    }
    for (let post of user.savedPosts) {
      post.imageUrl = await getObjectSignedUrl(post.imageName);

      // Check if the current user is the author of the post

      // Check if the post is saved by the user
      post.isSaved = user.savedPosts.includes(post._id);

      
    }

    // Send the user data with populated 'posts' and 'savedPosts' arrays
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
    const isAiGenerated = req.body.isAiGenerated;
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
      isAiGenerated
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




