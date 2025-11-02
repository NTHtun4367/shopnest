import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "@/components/products/ProductList";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function Home() {
  const { data: newArrivals = [] } = useGetNewArrivalsQuery(undefined);
  const { data: featured = [] } = useGetFeaturedQuery(undefined);

  return (
    <main>
      <section className="mt-16">
        <h1 className="text-2xl text-center font-bold mb-6">NEW ARRIVALS</h1>
        <ProductList products={newArrivals} />
        <Link
          to={"/products/filter"}
          className="flex items-center justify-center mt-8"
        >
          <Button variant={"secondary"} className="border-2 cursor-pointer">
            View All
          </Button>
        </Link>
      </section>
      <section className="mt-16">
        <h1 className="text-2xl text-center font-bold mb-6">BEST DEALS</h1>
        <ProductList products={featured} />
        <Link
          to={"/products/filter"}
          className="flex items-center justify-center mt-8"
        >
          <Button variant={"secondary"} className="border-2 cursor-pointer">
            View All
          </Button>
        </Link>
      </section>
    </main>
  );
}

export default Home;
