import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useGetAllOrdersQuery } from "@/store/slices/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function RecentOrder() {
  const { data } = useGetAllOrdersQuery(undefined);
  const recentOrders = data?.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>View your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Email</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      order.status === "paid"
                        ? "bg-green-600"
                        : order.status === "delivered"
                        ? "bg-gray-600"
                        : order.status === "pending"
                        ? "bg-yellow-600"
                        : order.status === "cancelled"
                        ? "bg-red-600"
                        : "bg-primary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${order.bill.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentOrder;
