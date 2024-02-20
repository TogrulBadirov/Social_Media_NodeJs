import express from "express";
import { createPost, createUser, deleteUser, getAllUser, getUserById, login, updateUser, verifyToken } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

//Get All User
router.get("/",getAllUser)

//Get User By Id
router.get("/:userId",getUserById)

//Create User
router.post("/",createUser)

//Login User
router.post("/login",login)

//Update User
router.put("/:userId",updateUser)

//Delete User
router.delete("/:userId",deleteUser)

// Route for verifying the token
router.get('/verify/:token', verifyToken);

//Create Post
router.post('/posts', upload.single('image'), createPost)



export default router;
