import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectionDB() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("DATABASE_URL is not defined in environment variables");
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}
