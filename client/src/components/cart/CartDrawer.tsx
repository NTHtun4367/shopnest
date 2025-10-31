import { X } from "lucide-react";
import CartItem from "./CartItem";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "../ui/button";
import { clearCart } from "@/store/slices/cart";
import { useCreateCheckOutSessionMutation } from "@/store/slices/orderApi";

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart(): void;
}

function CartDrawer({ isCartOpen, toggleCart }: CartDrawerProps) {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [createCheckOutSession, { isLoading }] =
    useCreateCheckOutSessionMutation();
  const bill = products.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const checkoutHandler = async () => {
    try {
      const { url } = await createCheckOutSession({
        items: products,
        bill,
      }).unwrap();
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isDesktop && (
        <div
          className={`fixed top-0 right-0 bg-white w-1/4 h-full p-4 transform transition-transform duration-300 z-50 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-full">
            <div className="flex justify-end w-full">
              <X onClick={toggleCart} className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-between my-2">
              <h2 className="text-2xl font-bold my-4">Your Cart</h2>
              {products.length > 2 && (
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  className="cursor-pointer"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear All
                </Button>
              )}
            </div>
            <div className="max-h-[520px] overflow-scroll scrollbar-hide">
              {products.map((product, index) => (
                <CartItem
                  key={index}
                  name={product.name}
                  image={product.image}
                  size={product.size}
                  color={product.color}
                  price={Number(product.price)}
                  quantity={product.quantity}
                  productKey={product.key!}
                />
              ))}
            </div>
            {products.length > 0 ? (
              <button
                className="absolute bottom-0 right-0 w-full bg-primary py-2 text-white text-center rounded-md cursor-pointer"
                onClick={checkoutHandler}
                disabled={isLoading}
              >
                Go to Checkout
              </button>
            ) : (
              <div>
                <p>No products in cart.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawer;
