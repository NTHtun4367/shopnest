import OrderStatusDropDown from "@/components/admin/OrderStatusDropDown";
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
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllOrdersQuery } from "@/store/slices/orderApi";
import { Package, ReceiptText, ShieldCheck, Mail } from "lucide-react";

function OrderManagement() {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto pb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Order Management
        </h2>
      </div>

      <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableCaption className="pb-4">
              Comprehensive list of all orders in the system.
            </TableCaption>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[180px] font-bold">Order ID</TableHead>
                <TableHead className="w-[120px] text-center font-bold">
                  Status
                </TableHead>
                <TableHead className="text-right font-bold">Amount</TableHead>
                <TableHead className="text-right font-bold">
                  Customer Info
                </TableHead>
                <TableHead className="text-center font-bold">Details</TableHead>
                <TableHead className="text-center font-bold pe-6">
                  Manage Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No orders available to manage.
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((order) => (
                  <TableRow
                    key={order._id}
                    className="group transition-colors hover:bg-gray-50/80"
                  >
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-gray-900 uppercase">
                          INV-{order._id.slice(-6)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                          {order._id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={`capitalize px-3 py-1 text-[11px] font-bold border-none text-white shadow-sm ${
                          order.status === "paid"
                            ? "bg-green-600 hover:bg-green-600"
                            : order.status === "delivered"
                              ? "bg-gray-600 hover:bg-gray-600"
                              : order.status === "pending"
                                ? "bg-yellow-600 hover:bg-yellow-600"
                                : order.status === "cancelled"
                                  ? "bg-red-600 hover:bg-red-600"
                                  : "bg-primary hover:bg-primary"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-gray-900">
                      ${order.bill.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 text-sm font-medium text-gray-600">
                        <Mail className="w-3 h-3" />
                        {order.customer}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-bold border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-all rounded-full px-4 cursor-pointer"
                          >
                            View Items
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl font-bold border-b pb-4">
                              <ReceiptText className="w-5 h-5 text-primary" />
                              Order Content
                            </DialogTitle>
                          </DialogHeader>

                          <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0"
                              >
                                <div className="flex gap-4 items-center">
                                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Package className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <div>
                                    <h2 className="font-bold text-gray-900 leading-tight">
                                      {item.name}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1.5">
                                      <div
                                        className="w-4 h-4 rounded-full border border-gray-200"
                                        style={{ backgroundColor: item.color }}
                                      />
                                      <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase">
                                        Size: {item.size}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-primary">
                                    ${item.price}
                                  </p>
                                  <p className="text-[10px] text-gray-400 font-medium">
                                    Qty: {item.quantity || 1}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl mt-2 border border-gray-100">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">
                                Revenue Total
                              </span>
                              <span className="text-lg font-black text-primary">
                                ${order.bill.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-center pe-6">
                      <div className="inline-block transition-transform hover:scale-105">
                        <OrderStatusDropDown
                          orderId={order._id}
                          orderStatus={order.status}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderManagement;
