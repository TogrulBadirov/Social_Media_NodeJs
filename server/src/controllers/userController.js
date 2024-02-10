import User from "../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const FRONTEND_URL = process.env.FRONTEND_URL

const transport = nodemailer.createTransport({
  service: "yandex",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

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
        html:`<a href="${FRONTEND_URL}/verify/${verificationToken}">Verify Email</a>`
      };
      
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Mail sent: " + info.response);
        // res.send("Reset email send");
      }
    });

    res.status(201).send("User Successfully Registered!");
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

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already verified
    if (user.verified) {
      return res.status(400).json({ error: 'User is already verified' });
    }

    // Update user verification status
    user.verified = true;
    user.verificationToken = ""; // Clear verification token
    await user.save();

    res.status(200).json({ message: 'Email verification successful' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Token has expired. Please request a new verification link.' });
    }

    console.error(error);
    res.status(400).json({ error: 'Invalid token' });
  }
};

  