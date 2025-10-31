import { body, param } from "express-validator";

export const createOrderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array."),
  body("items.*.productId")
    .notEmpty()
    .withMessage("ProductId is required for each item.")
    .isMongoId()
    .withMessage("ProductId must be a valid MongoDb ID."),
  body("items.*.name").notEmpty().withMessage("Each item must have a name."),
  body("items.*.price")
    .isFloat({ gt: 0 })
    .withMessage("Each item must have a price > 0"),
  body("items.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("Each item must have a quantity > 0"),
  body("items.*.size").notEmpty().withMessage("Each item must have a size"),
  body("items.*.color").notEmpty().withMessage("Each item must have a color."),
  body("bill")
    .isFloat({ gt: 0 })
    .withMessage("Bill is required and must be > 0"),
];

export const confirmSessionIdValidator = [
  param("session_id").notEmpty().withMessage("Valid session id is required."),
];
