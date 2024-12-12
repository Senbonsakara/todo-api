import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URL;

export const dbConnection = async () => {
  await mongoose.connect(mongoUri);
  console.log("Database Up");
};
