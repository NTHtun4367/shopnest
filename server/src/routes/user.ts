import { Router } from "express";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  updateEmailAddress,
  updateName,
  uploadAvatar,
} from "../controllers/user";
import { protect } from "../middlewares/authMiddleware";
import {
  emailUpdateValidator,
  loginValidator,
  nameUpdateValidator,
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
router.post(
  "/update-email",
  emailUpdateValidator,
  validateRequest,
  protect,
  updateEmailAddress
);
router.post(
  "/update-name",
  nameUpdateValidator,
  validateRequest,
  protect,
  updateName
);

export default router;
