import express from "express";
import { createPost, createUser, deleteUser, getAllUser, getUserById, login, updateUser, verifyToken } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";
import { deletePost, getAllPosts } from "../controllers/postController.js";
import { authenticateUser } from "../auth/authorizeUser.js";
const router = express.Router();

//Get All Posts
router.get("/", authenticateUser, getAllPosts)

//Delete Post
router.delete('/:id', authenticateUser, deletePost)

export default router;
