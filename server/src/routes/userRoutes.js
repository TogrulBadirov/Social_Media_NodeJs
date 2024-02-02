import express from "express";
import { createUser, deleteUser, getAllUser, getUserById, updateUser, verifyToken } from "../controllers/userController.js";
const router = express.Router();

//Get All User
router.get("/",getAllUser)

//Get User By Id
router.get("/:userId",getUserById)

//Create User
router.post("/",createUser)

//Update User
router.put("/:userId",updateUser)

//Delete User
router.delete("/:userId",deleteUser)

// Route for verifying the token
router.get('/verify/:token', verifyToken);

export default router;
