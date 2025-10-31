import { model, Schema, Types } from "mongoose";

export interface OrderItem {
  productId: Types.ObjectId;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface OrderDocument extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  bill: number;
  customer: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentIntendId?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const orderItemSchema = new Schema<OrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    bill: {
      type: Number,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentIntendId: { type: String },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

const Order = model<OrderDocument>("Order", orderSchema);
export default Order;
