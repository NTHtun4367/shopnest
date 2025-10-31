import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/store/slices/cart";
import { useConfirmSessionQuery } from "@/store/slices/orderApi";
import { CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";

function ConfirmOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useConfirmSessionQuery(sessionId!);

  useEffect(() => {
    if (!sessionId || isError) {
      navigate("/");
    } else {
      dispatch(clearCart());
    }
  }, [sessionId, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-center mt-4">
        <CircleCheck className="w-28 h-28 text-white fill-green-500" />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Thank for your purchase</h2>
        <p className="text-muted-foreground mt-4">
          We've received your order will ship in 5-7 business dasys.
        </p>
      </div>
      <div className="max-w-[500px] mx-auto bg-white text-center px-8 py-4 rounded-lg mt-8 shadow-[6px_6px_10px_6px_rgba(0,_0,_0,_0.1)]">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {data?.items.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between border-b-2 border-b-muted-foreground/20 py-4"
          >
            <h4>{product.name}</h4>
            <p>${product.price}</p>
          </div>
        ))}
        <div className="flex items-center justify-between py-4">
          <h4 className="text-lg font-medium">Total</h4>
          <p className="text-lg font-bold">${data?.bill.toFixed(2)}</p>
        </div>
      </div>
      <div className="max-w-[500px] mx-auto flex items-center justify-center gap-4 my-4">
        <Button asChild variant={"outline"}>
          <Link to={"/"}>Go to HomePage</Link>
        </Button>
        <Button asChild>
          <Link to={"/profile/orders"}>Go to OrderPage</Link>
        </Button>
      </div>
    </div>
  );
}

export default ConfirmOrder;
