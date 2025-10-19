import { Menu } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useNavigate, useSearchParams } from "react-router";

const categories = ["T-Shirt", "Hoodie", "Gym", "Shorts", "Jeans"];

function SecondaryBar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    const categoryLower = category.toLowerCase();

    if (currentCategory === categoryLower) {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryLower);
    }
    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };

  const currentCategory = searchParams.get("category");

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
                <p
                  key={index}
                  className={`font-semibold cursor-pointer ${
                    currentCategory === category.toLowerCase() && "underline"
                  }`}
                  onClick={() => handleClick(category)}
                >
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
              className={`text-sm font-semibold border-2 border-[#292526] px-2 py-1 rounded-md cursor-pointer ${
                currentCategory === category.toLowerCase() &&
                "bg-[#292526] text-white"
              }`}
              onClick={() => handleClick(category)}
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
