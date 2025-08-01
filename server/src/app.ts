import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConnect";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

// routes

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  // database connection
  connectDB();
  console.log("Server is running on PORT =>", PORT);
});
