import type { Order } from "@/types/order";

export const FAKE_ORDERS: Order[] = [
  {
    id: "1",
    userId: "user-a",
    items: [
      {
        productId: "p01",
        name: "Jacket",
        quantity: 3,
        price: 200,
        image: "/image/hello",
      },
    ],
    bill: 400,
    status: "paid",
    createdAt: "jdkjfkdjkf",
    updatedAt: "kdjfkdjfkdj",
    customer: "Name",
  },
  {
    id: "2",
    userId: "user-a",
    items: [
      {
        productId: "p01",
        name: "T-shirt",
        quantity: 3,
        price: 200,
        image: "/image/hello",
      },
    ],
    bill: 400,
    status: "cancelled",
    createdAt: "jdkjfkdjkf",
    updatedAt: "kdjfkdjfkdj",
    customer: "Name",
  },
];
