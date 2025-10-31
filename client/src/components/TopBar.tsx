import { ShoppingCart, SlidersHorizontal, UserCircle } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link, useNavigate } from "react-router";
import useMediaQuery from "../hooks/useMediaQuery";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import CartItem from "./cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { clearUserInfo } from "@/store/slices/auth";
import { useCurrentUserQuery, useLogoutMutation } from "@/store/slices/userApi";
import { useEffect } from "react";
import { apiSlice } from "@/store/slices/api";
import { useCreateCheckOutSessionMutation } from "@/store/slices/orderApi";

interface TopBarProps {
  toggleCart(): void;
}

function TopBar({ toggleCart }: TopBarProps) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const products = useSelector((state: RootState) => state.cart.items);
  const productsInCart = products.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const { data: currentUser, isError } = useCurrentUserQuery();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [createCheckOutSession, { isLoading: checkOutLoading }] =
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

  const logoutHandler = async () => {
    try {
      await logoutMutation({});
      dispatch(clearUserInfo());
      dispatch(apiSlice.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError || !userInfo) {
      navigate("/");
      dispatch(clearUserInfo());
    }
  }, [isError, userInfo]);

  return (
    <>
      {isDesktop ? (
        <nav className="bg-primary text-white py-5">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link to={"/"} className="text-3xl font-bold italic">
              SHOPNEST
            </Link>
            <SearchBox />
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart onClick={toggleCart} className="cursor-pointer" />
                <span className="text-xs text-primary bg-secondary rounded-full w-4 h-4 absolute text-center -top-2 -right-2 font-bold">
                  {productsInCart}
                </span>
              </div>
              {userInfo ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <UserCircle className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={"/profile"}>
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logoutHandler}
                      disabled={isLoading}
                    >
                      <span className="text-destructive">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="bg-secondary text-primary text-xs font-semibold px-4 py-2 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="bg-secondary text-primary text-xs font-semibold px-4 py-2 rounded-md"
                  >
                    Register
                  </Link>
                </>
              )}
              {currentUser?.role === "admin" && userInfo && (
                <Button size={"sm"} variant={"secondary"} asChild>
                  <Link to={"/admin/dashboard"}>Go to dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <nav className="flex flex-col">
          <div className="flex items-center justify-between w-full bg-primary text-white px-6 py-4">
            <Link to={"/"} className="text-2xl font-bold italic">
              SHOPNEST
            </Link>
            <div className="flex items-center gap-2">
              <Drawer>
                <DrawerTrigger>
                  <div className="relative">
                    <ShoppingCart
                      onClick={toggleCart}
                      className="cursor-pointer"
                    />
                    <span className="text-xs text-primary bg-secondary rounded-full w-4 h-4 absolute text-center p -top-2 -right-2 font-bold">
                      {productsInCart}
                    </span>
                  </div>
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
                        image={product.image}
                        size={product.size}
                        color={product.color}
                        price={Number(product.price)}
                        quantity={product.quantity}
                        productKey={product.key!}
                      />
                    ))}
                  </div>
                  <DrawerFooter>
                    {products.length > 0 ? (
                      <Button
                        className="bg-primary"
                        onClick={checkoutHandler}
                        disabled={checkOutLoading}
                      >
                        Go to Checkout
                      </Button>
                    ) : (
                      <div className="text-center">
                        <p>No products in cart.</p>
                      </div>
                    )}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              {userInfo ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <UserCircle className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={"/profile"}>
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logoutHandler}
                      disabled={isLoading}
                    >
                      <span className="text-destructive">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="bg-secondary text-primary text-xs font-medium px-3 py-1.5 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="bg-secondary text-primary text-xs font-medium px-3 py-1.5 rounded-md"
                  >
                    Register
                  </Link>
                </>
              )}
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
