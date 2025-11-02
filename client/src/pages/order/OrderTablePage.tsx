import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersByUserIdQuery } from "@/store/slices/orderApi";

function OrderTablePage() {
  const { data, isLoading } = useGetOrdersByUserIdQuery(undefined);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold my-6">My Orders</h2>
      <Table>
        <TableCaption>A list or your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Order Id</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length === 0 && <p className="p-4">No orders found.</p>}
          {data?.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">INV - {order._id}</TableCell>
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
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger>
                    <Button size={"sm"}>View order items</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Items</DialogTitle>
                    </DialogHeader>
                    <div>
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4 border-b border-b-gray-300"
                        >
                          <div>
                            <h2 className="font-medium">{item.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                              <div
                                className="w-12 h-4 border-2 border-gray-400 rounded-sm"
                                style={{ backgroundColor: item.color }}
                              />
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
                                {item.size.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-lg font-semibold">${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderTablePage;
