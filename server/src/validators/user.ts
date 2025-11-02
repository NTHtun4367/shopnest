import { body, param } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Invalid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

export const uploadImageAvatarValidator = [
  body("image_url").notEmpty().withMessage("Image is required."),
];

export const emailUpdateValidator = [
  body("email").isEmail().withMessage("Invalid email address."),
];

export const nameUpdateValidator = [
  body("name").notEmpty().withMessage("Name is required."),
];

export const passwordUpdateValidator = [
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Old password must be at least 6 characters."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters."),
];

export const passwordResetValidator = [
  body("email").isEmail().withMessage("Invalid email address."),
];

export const passwordChangeValidator = [
  param("token").notEmpty().withMessage("Token is required."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters."),
];

export const userIdValidator = [
  param("userId").isMongoId().withMessage("Invalid user id."),
];

export const userStatusValidator = [
  body("status").isIn(["active", "ban"]).withMessage("Invalid user status."),
];
