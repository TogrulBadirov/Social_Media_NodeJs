// Import necessary modules and packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";

// Initialize Express app
const app = express();

// Middleware
dotenv.config(); // Load environment variables from .env file
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON data in request body

// Use the userRouter for routes under the root path "/"
app.use("/user", userRouter);

// Database setup
const ConnectionPass = process.env.CONNECTION_PASS;
const ConnectionUrl = process.env.CONNECTION_URL.replace(
  "<password>",
  ConnectionPass
);
mongoose
  .connect(ConnectionUrl)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("Error connecting to the database:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!"); // Send a generic error response
});

export default app;
