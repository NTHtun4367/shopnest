import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connected =>", response.connection.host);
  } catch (error) {
    console.log("DB connection error =>", error);
    process.exit(1);
  }
};
