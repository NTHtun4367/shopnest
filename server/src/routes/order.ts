import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  confirmSessionIdValidator,
  createOrderValidator,
} from "../validators/order";
import { validateRequest } from "../middlewares/validateRequest";
import {
  confirmSessionId,
  createOrderAndCheckOutSession,
} from "../controllers/order";
const router = Router();

router.post(
  "/create-order",
  protect,
  createOrderValidator,
  validateRequest,
  createOrderAndCheckOutSession
);
router.get(
  "/confirm-order/:session_id",
  protect,
  confirmSessionIdValidator,
  validateRequest,
  confirmSessionId
);

export default router;
