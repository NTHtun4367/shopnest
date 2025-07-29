import { useState } from "react";
import SecondaryBar from "../components/SecondaryBar";
import TopBar from "../components/TopBar";
import CartDrawer from "../components/cart/CartDrawer";

function NavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div>
      <TopBar toggleCart={toggleCart} />
      <SecondaryBar />
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}

export default NavBar;
