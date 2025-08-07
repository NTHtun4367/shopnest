import { X } from "lucide-react";
import CartItem from "./CartItem";
import useMediaQuery from "@/hooks/useMediaQuery";
import { products } from "@/utils/products";

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart(): void;
}

function CartDrawer({ isCartOpen, toggleCart }: CartDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
            <h2 className="text-2xl font-bold my-4">Your Cart</h2>
            <div className="max-h-[520px] overflow-scroll scrollbar-hide">
              {products.map((product, index) => (
                <CartItem
                  key={index}
                  name={product.name}
                  image={product.images[0].url}
                  size={product.size[0]}
                  color={product.colors[0]}
                  price={product.price}
                />
              ))}
            </div>
            <button className="absolute bottom-0 right-0 w-full bg-primary py-2 text-white text-center rounded-md cursor-pointer">
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawer;
