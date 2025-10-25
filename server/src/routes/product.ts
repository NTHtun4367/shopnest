import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivalProducts,
  getProductById,
  getProductsMeta,
  getProductWithFilters,
  updateProduct,
} from "../controllers/product";
import { isAdmin, protect } from "../middlewares/authMiddleware";
// import { createProductValidator } from "../validators/product";
// import { validateRequest } from "../middlewares/validateRequest";
import { upload } from "../utils/upload";

const router = Router();

router.post(
  "/products",
  protect,
  isAdmin,
  upload.array("images"),
  createProduct
);
router.put(
  "/products/:id",
  protect,
  isAdmin,
  upload.array("images"),
  updateProduct
);
router.delete("/products/:id", protect, isAdmin, deleteProduct);
router.get("/products", getProductWithFilters);
router.get("/products/new", getNewArrivalProducts);
router.get("/products/featured", getFeaturedProducts);
router.get("/products/:id", getProductById);
router.get("/filters/meta", getProductsMeta);

export default router;
