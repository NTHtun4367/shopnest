import { ShoppingCart, SlidersHorizontal, UserCircle } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link } from "react-router";
import useMediaQuery from "../hooks/useMediaQuery";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { products } from "@/utils/products";
import CartItem from "./cart/CartItem";

interface TopBarProps {
  toggleCart(): void;
}

function TopBar({ toggleCart }: TopBarProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <nav className="primary-bg text-white py-5">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link to={"/"} className="text-3xl font-bold italic">
              SHOPNEST
            </Link>
            <SearchBox />
            <div className="flex items-center gap-4">
              <ShoppingCart onClick={toggleCart} className="cursor-pointer" />
              <UserCircle />
            </div>
          </div>
        </nav>
      ) : (
        <nav className="flex flex-col">
          <div className="flex items-center justify-between w-full primary-bg text-white px-6 py-4">
            <Link to={"/"} className="text-2xl font-bold italic">
              SHOPNEST
            </Link>
            <div className="flex items-center gap-4">
              <Drawer>
                <DrawerTrigger>
                  <ShoppingCart
                    onClick={toggleCart}
                    className="cursor-pointer"
                  />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>YOUR CARTS</DrawerTitle>
                  </DrawerHeader>
                  <div className="max-h-[300px] mx-6 overflow-scroll scrollbar-hide">
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
                  <DrawerFooter>
                    <Button className="primary-bg">Go to Checkout</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <UserCircle />
            </div>
          </div>
          <div className="flex items-center gap-2 secondary-bg px-6 py-2">
            <SlidersHorizontal />
            <SearchBox />
          </div>
        </nav>
      )}
    </>
  );
}

export default TopBar;
