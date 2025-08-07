import { body } from "express-validator";

export const registerValidator = [
  body("username").notEmpty().withMessage("Username is required."),
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
