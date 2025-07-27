import { ShoppingCart, SlidersHorizontal, UserCircle } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link } from "react-router";
import useMediaQuery from "../hooks/useMediaQuery";

function TopBar() {
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
              <ShoppingCart />
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
              <ShoppingCart />
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
