import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/authMiddleware";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";

// @route POST | api/register
// @desc Register new user
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exist with this email address.");
    }

    const newUser = await User.create({ username, email, password });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    }
  }
);

// @route POST | api/login
// @desc Login to existing user's account
// @access Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser && (await existingUser.matchPassword(password))) {
    generateToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found with this credentials.");
  }
});

// @route POST | api/logout
// @desc Clear token
// @access Public
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successfully." });
});

// @route POST | api/upload
// @desc Update or upload user's avatar
// @access Private
export const uploadAvatar = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { image_url } = req.body;

    const userDoc = await User.findById(user?._id);

    if (userDoc?.avatar?.url) {
      await deleteImage(userDoc.avatar.public_alt);
    }

    const response = await uploadSingleImage(image_url, "shopnest/avatar");

    await User.findByIdAndUpdate(user?._id, {
      avatar: {
        url: response.image_url,
        public_alt: response.public_alt,
      },
    });

    res.status(200).json({ message: "Avatar uploaded." });
  }
);

// @route GET | api/me
// @desc Get login user's information
// @access Private
export const getUserInfo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    const userDoc = await User.findById(user?._id).select("-password");

    res.status(200).json(userDoc);
  }
);
