import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    console.log("connection db");
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected ! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
