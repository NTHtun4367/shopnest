import { FAKE_ORDERS } from "@/utils/fakeOrder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

function RecentOrder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>View your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="text-xs">
          <thead>
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {FAKE_ORDERS.map((order) => (
              <tr key={order.id}>
                <td className="p-2 text-center">{order.id}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className="p-2">
                  <Badge
                    variant={
                      order.status === "cancelled" ? "destructive" : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="p-2">${order.bill.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default RecentOrder;
