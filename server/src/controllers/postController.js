import User from "../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sharp from "sharp";
import Post from "../models/post.js";
import moment from "moment"
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

      // Find the user by ID to check if the post is saved by the user
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Check if the post is saved by the user
      post.isSaved = user.savedPosts.includes(post._id);

      const createdAt = post.createdAt;
      post.timeAgo = moment(createdAt).fromNow();
    }

    // Send the posts with the isAuthor and isSaved flags
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
  


  export const toggleLike = async (req, res) => {
    try {
      const postId = req.body.postId;
      const userId = req.user._id;
      // Check if the user has already liked the post
      const post = await Post.findById(postId);
      console.log(userId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const isLiked = post.likes.includes(userId);
  
      if (isLiked) {
        // If the user has already liked the post, remove the like
        post.likes.pull(userId);
        post.likesCount -= 1;
      } else {
        // If the user has not liked the post, add the like
        post.likes.push(userId);
        post.likesCount += 1;
      }
  
      // Save the updated post
      await post.save();
  
      res.json({ message: "Like toggled successfully", likesCount: post.likesCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error toggling like" });
    }
  };
  
  export const toggleSavedPost = async (req, res) => {
    try {
      // Find the user by their ID
      const postId = req.body.postId;
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      // Check if the post is already saved by the user
      const savedIndex = user.savedPosts.indexOf(postId);
      if (savedIndex === -1) {
        // Post is not saved, so save it
        user.savedPosts.push(postId);
      } else {
        // Post is saved, so unsave it
        user.savedPosts.splice(savedIndex, 1);
      }
      
      // Save the user document with the updated savedPosts array
      await user.save();
  
      return user.savedPosts; // Return the updated savedPosts array
    } catch (error) {
      throw new Error('Error toggling saved post: ' + error.message);
    }
  };