import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConnect";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import errorHandler from "./middlewares/errorHandler";
import Stripe from "stripe";
import TempCart from "./models/tempCart";
import Order from "./models/order";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

const endpointSecret =
  "whsec_e3aad632932d64e53ea3a04323f9b6649584aa88406d8d31b47dc319e9b6245e";

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    console.log("Stripe webhook is online");

    let event;
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"];
      try {
        if (!signature) {
          throw new Error("Signature not found.");
        }
        event = Stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err: any) {
        console.log(`⚠️ Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          try {
            const session = event.data.object;
            console.log(event.data, session);

            const userId = session.metadata?.customerId;
            const email = session.metadata?.customer;
            const bill = Number(session.metadata?.bill);
            const tempCartId = session.metadata?.tempCartId;

            if (!userId || !email || !bill || !tempCartId) {
              throw new Error("Missing some metadata");
            }

            const tempCart = await TempCart.findById(tempCartId);

            await Order.create({
              userId,
              customer: email,
              bill,
              paymentIntendId: session.payment_intent,
              stripeSessionId: session.id,
              items: tempCart?.items,
              status: "paid",
            });

            await TempCart.findByIdAndDelete(tempCartId);
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a response to acknowledge receipt of the event
      res.status(200).json({ received: true });
    }
  }
);

app.use(json());

// routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  // database connection
  connectDB();
  console.log("Server is running on PORT =>", PORT);
});
