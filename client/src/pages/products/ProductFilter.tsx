import ProductCard from "@/components/products/ProductCard";
import ProductFilterDropDown from "@/components/products/ProductFilterDropDown";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/slices/productApi";
import type { Product, ProductFilters } from "@/types/product";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function ProductFilter() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilters = (): ProductFilters => {
    const queryParams = new URLSearchParams(location.search);
    return {
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      colors: queryParams.getAll("colors"),
      sizes: queryParams.getAll("sizes"),
    };
  };

  //   local state (UI update / from URL)
  const [filters, setFilters] = useState(initialFilters);

  //   update local state (when URL change)
  useEffect(() => {
    setFilters(initialFilters());
  }, [location.search]);

  //   sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.category) params.set("category", filters.category);

    filters.colors.forEach((color) => params.append("colors", color));
    filters.sizes.forEach((size) => params.append("sizes", size));

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    const newSearchQuery = params.toString();
    const currentSearchQuery = location.search.slice(1);

    if (newSearchQuery !== currentSearchQuery) {
      const timeOutId = setTimeout(() => {
        navigate(
          { pathname: "/products/filter", search: newSearchQuery },
          { replace: true }
        );
      }, 100);

      return () => clearTimeout(timeOutId);
    }
  }, [filters, navigate, location.search]);

  const { data: products = [], isLoading } = useGetProductsQuery(filters) as {
    data: Product[];
    isLoading: boolean;
  };

  const { data: product_meta } = useGetProductsMetaQuery("none");

  const toggleValue = (key: "colors" | "sizes", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((x) => x !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      colors: [],
      sizes: [],
      maxPrice: "",
      minPrice: "",
    });
    navigate("/products/filter", { replace: true });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.keyword ||
      filters.category ||
      filters.colors.length > 0 ||
      filters.sizes.length > 0 ||
      filters.minPrice ||
      filters.maxPrice
    );
  }, [filters]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // const gridMedia = isDesktop
  //   ? "grid grid-cols-5 gap-6"
  //   : "grid grid-cols-2 mx-6 gap-2";

  return (
    <section
      className={isDesktop ? "grid grid-cols-12 mt-12" : "w-full px-6 mt-6"}
    >
      <div className={isDesktop ? "col-span-2" : ""}>
        <h2
          className={isDesktop ? "text-xl font-bold mb-2" : "text-lg font-bold"}
        >
          Product Filters
        </h2>
        {isDesktop ? (
          <>
            <h3 className="text-lg font-bold mb-2">Colors</h3>
            <div className="flex flex-col gap-2">
              {product_meta?.colors.map((color, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-1"
                    onChange={() => toggleValue("colors", color)}
                    checked={filters.colors.includes(color)}
                  />
                  <div
                    className="w-14 h-3 border border-gray-600 rounded-xs"
                    style={{ backgroundColor: color }}
                  />
                </label>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-2 mt-4">Sizes</h3>
            <div className="flex flex-col gap-1">
              {product_meta?.sizes.map((size, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    className="mr-1"
                    onChange={() => toggleValue("sizes", size)}
                    checked={filters.sizes.includes(size)}
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <SlidersHorizontal className="w-12 h-12" />
            <ProductFilterDropDown
              type="colors"
              product_meta={product_meta!}
              filters={filters}
              toggleValue={toggleValue}
            />
            <ProductFilterDropDown
              type="sizes"
              product_meta={product_meta!}
              filters={filters}
              toggleValue={toggleValue}
            />
          </div>
        )}

        {isDesktop && <h3 className="text-lg font-bold mb-2 mt-4">Sizes</h3>}
        <div className={isDesktop ? "" : "flex items-center gap-2 my-2"}>
          <input
            type="number"
            min={0}
            placeholder={`Min (${product_meta?.minPrice})`}
            className={
              isDesktop
                ? "w-[150px] border-2 p-1 rounded-sm mb-2"
                : "w-full border p-1 rounded-md"
            }
            value={filters.minPrice!}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            min={product_meta?.minPrice}
            placeholder={`Max (${product_meta?.maxPrice})`}
            className={
              isDesktop
                ? "w-[150px] border-2 p-1 rounded-sm"
                : "w-full border p-1 rounded-md"
            }
            value={filters.maxPrice!}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
          />
          {hasActiveFilters && (
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={clearAllFilters}
              className={
                isDesktop ? "w-[150px] mt-2 cursor-pointer" : "cursor-pointer"
              }
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      <div className={isDesktop ? "col-span-10" : ""}>
        {isLoading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div
            className={
              isDesktop ? "grid grid-cols-4 gap-6" : "grid grid-cols-2 gap-2"
            }
          >
            {products.map((product, index) => (
              <ProductCard
                _id={product._id}
                image={product.images[0].url}
                name={product.name}
                price={product.price}
                ratingCount={product.rating_count}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductFilter;
