import { Router } from "express";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
} from "../controllers/user";
import { protect } from "../middlewares/authMiddleware";
import {
  loginValidator,
  registerValidator,
  uploadImageAvatarValidator,
} from "../validators/user";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.post("/logout", logoutUser);

router.post(
  "/upload",
  uploadImageAvatarValidator,
  validateRequest,
  protect,
  uploadAvatar
);
router.get("/me", protect, getUserInfo);

export default router;
