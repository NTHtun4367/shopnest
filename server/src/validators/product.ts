// import { body } from "express-validator";

// export const createProductValidator = [
//   body("name").notEmpty().withMessage("Name is required."),
//   body("description").notEmpty().withMessage("Description is required."),
//   body("price").isNumeric().withMessage("Price must be numeric."),
//   body("instock_count").isInt().withMessage("Instock count must be integer."),
//   body("category").notEmpty().withMessage("Category is required."),
//   body("sizes")
//     .isArray({ min: 1 })
//     .withMessage("Sizes must have at least one."),
//   body("colors")
//     .isArray({ min: 1 })
//     .withMessage("Colors must have at least one."),
//   body("images").isArray({ min: 1 }).withMessage("Images must be array."),
//   body("images.*.url").notEmpty().withMessage("Each image must have url."),
//   body("images.*.public_alt")
//     .notEmpty()
//     .withMessage("Each image must have public alt."),
//   body("is_new_arrival")
//     .isBoolean()
//     .withMessage("New arrival must be boolean."),
//   body("is_feature").isBoolean().withMessage("Feature must be boolean."),
//   body("rating_count").isInt().withMessage("Rating count must be integer."),
// ];
