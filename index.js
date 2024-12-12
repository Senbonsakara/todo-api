import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { dbConnection } from "./config/db.js";
import userProfileRouter from "./routes/userProfileRoutes.js";
import authRouter from "./routes/authRoutes.js";
import todoRouter from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

dbConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
app.use("/api/profile", userProfileRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
