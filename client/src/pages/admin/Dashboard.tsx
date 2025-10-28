import ProductChart from "@/components/admin/ProductChart";
import ProductStatusCard from "@/components/admin/ProductStatusCard";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";

function Dashboard() {
  const { data: products = [], isLoading } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
  };

  const totalProductsCount = products.length;
  const featuredProductsCount = products.filter((p) => p.is_feature).length;
  const newArrivalProductsCount = products.filter(
    (p) => p.is_new_arrival
  ).length;
  const instockProductsCount = products.reduce(
    (sum, p) => sum + p.instock_count,
    0
  );

  return (
    <section>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <ProductStatusCard
          title="Total Products"
          value={totalProductsCount}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Featured"
          value={featuredProductsCount}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="New Arrivals"
          value={newArrivalProductsCount}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Total InStock"
          value={instockProductsCount}
          isLoading={isLoading}
        />
      </div>
      <ProductChart data={products} />
    </section>
  );
}

export default Dashboard;
