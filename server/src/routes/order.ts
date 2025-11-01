import { Router } from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import {
  confirmSessionIdValidator,
  createOrderValidator,
  orderIdValidator,
  orderStatusValidator,
} from "../validators/order";
import { validateRequest } from "../middlewares/validateRequest";
import {
  changeOrderStatus,
  confirmSessionId,
  createOrderAndCheckOutSession,
  getAllOrders,
  getOrdersByUserId,
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
router.get("/orders", protect, getOrdersByUserId);
router.get("/orders/all", protect, isAdmin, getAllOrders);
router.patch(
  "/orders/:orderId",
  protect,
  isAdmin,
  orderIdValidator,
  orderStatusValidator,
  validateRequest,
  changeOrderStatus
);

export default router;
