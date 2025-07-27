import { Menu } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";

const categories = ["T-Shirt", "Hoodie", "Shirt", "Gym", "Shorts", "Jeans"];

function SecondaryBar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <nav className="secondary-bg text-black py-3">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <Menu />
              <p className="text-xl font-bold">Categories</p>
            </div>
            <div className="flex items-center justify-around gap-6">
              {categories.map((category, index) => (
                <p key={index} className="font-semibold">
                  {category}
                </p>
              ))}
            </div>
          </div>
        </nav>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2 w-full mt-2">
          {categories.map((category, index) => (
            <p
              key={index}
              className="text-sm font-semibold border-2 border-[#292526] px-2 py-1 rounded-md"
            >
              {category}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default SecondaryBar;
