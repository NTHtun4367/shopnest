import type { Product } from "@/types/product";
import useMediaQuery from "../../hooks/useMediaQuery";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const gridMedia = isDesktop
    ? "grid grid-cols-5 gap-6"
    : "grid grid-cols-2 mx-6 gap-2";

  return (
    <main className={gridMedia}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          _id={product._id}
          name={product.name}
          image={product.images[0].url}
          price={product.price}
          ratingCount={product.rating_count}
        />
      ))}
    </main>
  );
}

export default ProductList;
