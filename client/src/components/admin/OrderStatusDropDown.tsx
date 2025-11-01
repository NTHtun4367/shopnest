import { useChangeOrderStatusMutation } from "@/store/slices/orderApi";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Check } from "lucide-react";

type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

interface OrderStatusDropDownProps {
  orderId: string;
  orderStatus: OrderStatus;
}

const status = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

function OrderStatusDropDown({
  orderId,
  orderStatus,
}: OrderStatusDropDownProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>(orderStatus);
  const [changeOrderStatus, { isLoading }] = useChangeOrderStatusMutation();

  const handleChange = async (status: OrderStatus) => {
    setSelectedStatus(status);
    await changeOrderStatus({ orderId, status });
  };

  return (
    <Select
      value={selectedStatus}
      onValueChange={handleChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Order Status" />
      </SelectTrigger>
      <SelectContent>
        {status.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            <span className="flex items-center gap-1">
              {item.label}
              {selectedStatus === item.value && (
                <Check className="text-green-500" />
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default OrderStatusDropDown;
