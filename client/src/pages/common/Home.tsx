import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "@/components/products/ProductList";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import ProductSkeleton from "@/common/ProductSkeleton";

function Home() {
  const { data: newArrivals = [], isLoading: loadingNew } =
    useGetNewArrivalsQuery(undefined);
  const { data: featured = [], isLoading: loadingFeatured } =
    useGetFeaturedQuery(undefined);

  return (
    <main className="pb-20">
      {/* NEW ARRIVALS SECTION */}
      <section className="mt-16">
        <h1 className="text-2xl text-center font-bold mb-8">NEW ARRIVALS</h1>
        {loadingNew ? (
          <ProductSkeleton size={4} />
        ) : (
          <ProductList products={newArrivals} />
        )}
        <div className="flex items-center justify-center mt-10">
          <Link to={"/products/filter"}>
            <Button
              variant={"secondary"}
              className="border-2 px-8 py-5 font-semibold hover:bg-black hover:text-white transition-all"
            >
              View All Arrivals
            </Button>
          </Link>
        </div>
      </section>

      {/* BEST DEALS SECTION */}
      <section className="mt-24">
        <h1 className="text-2xl text-center font-bold mb-8">BEST DEALS</h1>
        {loadingFeatured ? (
          <ProductSkeleton size={4} />
        ) : (
          <ProductList products={featured} />
        )}
        <div className="flex items-center justify-center mt-10">
          <Link to={"/products/filter"}>
            <Button
              variant={"secondary"}
              className="border-2 px-8 py-5 font-semibold hover:bg-black hover:text-white transition-all"
            >
              Best Deals
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
