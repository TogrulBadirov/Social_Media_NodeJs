import express from "express";
import { authenticateUser } from "../auth/authorizeUser.js";
import { getLogo, updateLogo } from "../controllers/adminController.js";

const router = express.Router();


//Get Logo
router.get('/logo',getLogo )

//Update Logo
router.put('/logo',authenticateUser,updateLogo )

export default router;
