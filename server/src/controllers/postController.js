import User from "../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sharp from "sharp";
import Post from "../models/post.js";
import { uploadFile,getObjectSignedUrl, deleteFile } from "../helpers/s3.js";
const FRONTEND_URL = process.env.FRONTEND_URL;


export const getAllPosts = async (req, res) => {
    try {
        // Get the ID of the authenticated user from the request
        const userId = req.user._id;

        // Find all posts and populate the 'user' field
        const posts = await Post.find({}).populate({
            path: 'user',
            select: 'username fullName role' // Specify the fields to populate
        });

        // Check if there are no posts
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: "Posts not found" });
        }

        // Iterate through each post
        for (let post of posts) {
            // Add imageUrl to the post
            post.imageUrl = await getObjectSignedUrl(post.imageName);

            // Check if the current user is the author of the post
            post.isAuthor = post.user._id.equals(userId);
        }

        // Send the posts with the isAuthor flag
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving posts" });
    }
};

export const deletePost = async (req, res) => {
    try {
      // Get the user ID from the request token
      const userId = req.user._id;
      
      // Get the post ID from the request parameters
      const postId = req.params.id;
  
      // Find the post by ID
      const post = await Post.findById(postId);
  
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      // Check if the post belongs to the user
      if (post.user.toString() !== userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      // Delete the post image from storage
      await deleteFile(post.imageName);
  
      // Delete the post from the database
      await Post.findByIdAndDelete(postId);
  
      // Send the deleted post as the response
      res.json({ message: "Post deleted successfully", deletedPost: post });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


