import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/authMiddleware";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";
import bcrypt from "bcrypt";
import { forgetPasswordEmailTemplate } from "../utils/emailTemplate";
import { sendMail } from "../utils/sendEmail";
import crypto from "crypto";

// @route POST | api/register
// @desc Register new user
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exist with this email address.");
    }

    const newUser = await User.create({ name, email, password });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
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
    if (existingUser.status === "ban") {
      res.status(401);
      throw new Error("Your account has been banned.");
    }

    generateToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
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
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

// @route POST | api/update-email
// @desc Update user's email
// @access Private
export const updateEmailAddress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { email } = req.body;

    const existingEmailUser = await User.findOne({ email });

    if (existingEmailUser) {
      throw new Error("Email is already used by another users.");
    }

    await User.findByIdAndUpdate(user?._id, { email });

    res.status(200).json({ message: "User email updated." });
  }
);

// @route POST | api/update-name
// @desc Update user's name
// @access Private
export const updateName = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { name } = req.body;

    await User.findByIdAndUpdate(user?._id, { name });

    res.status(200).json({ message: "Profile name updated." });
  }
);

// @route POST | api/update-password
// @desc Update user's password
// @access Private
export const updatePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;

    const existingUser = await User.findById(user?._id).select("+password");

    if (!existingUser) {
      throw new Error("Something went wrong");
    }

    const isMatched = await bcrypt.compare(oldPassword, existingUser.password);

    if (!isMatched) {
      throw new Error("Old password is wrong.");
    }

    existingUser.password = newPassword;
    await existingUser.save();

    res.status(200).json({ message: "Password updated." });
  }
);

// @route POST | api/forgot-password
// @desc Send email to user's own email
// @access Private
export const sendForgotPasswordEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("This email doesn't exist.");
    }

    const token = await existingUser.generatePasswordResetToken();

    await existingUser.save();

    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const body = forgetPasswordEmailTemplate(resetPasswordUrl);

    try {
      await sendMail({
        receiver_mail: existingUser?.email!,
        subject: "Password Reset - SHOPNEST",
        body,
      });
    } catch (error) {
      existingUser.resetPasswordToken = undefined;
      existingUser.resetPasswordExpire = undefined;
      await existingUser.save();
    }

    res.status(200).json({ message: "Reset password email send." });
  }
);

// @route POST | api/reset-password/:token
// @desc Change user's password
// @access Private
export const resetPassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid token. Request email again.");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password changed." });
  }
);

// @route GET | /api/users/all
// @desc Get all users
// @access Private | Admin
export const getAllUsersInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find({ role: "customer" }).sort({ createdAt: -1 });
    res.status(200).json(users);
  }
);

// @route PATCH | /api/users/:userId
// @desc Change user status
// @access Private | Admin
export const changeUserStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found!");
    }

    res.status(200).json(updatedUser);
  }
);
