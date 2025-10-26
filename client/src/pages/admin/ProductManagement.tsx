import ProductStatusCard from "@/components/admin/ProductStatusCard";
import ProductTable from "@/components/products/ProductTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { PackagePlus } from "lucide-react";
import { Link } from "react-router";

function ProductManagement() {
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
    error: any;
  };

  const products = response || [];

  if (error) {
    return (
      <div>
        <Card>
          <CardContent>
            <p className="text-destructive">
              Failed to load products. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm">
            Manage your product inventory take actions
          </p>
        </div>
        <Button asChild>
          <Link to={"/admin/create-product"}>
            <PackagePlus />
            Create product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <ProductStatusCard
          title="Total Products"
          isLoading={isLoading}
          value={products.length}
        />
        <ProductStatusCard
          title="In Stock"
          isLoading={isLoading}
          value={products.filter((p) => p.instock_count > 0).length}
          iconColor="text-green-500"
        />
        <ProductStatusCard
          title="Out of Stock"
          isLoading={isLoading}
          value={products.filter((p) => p.instock_count === 0).length}
          iconColor="text-destructive"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage and sort your products</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable data={products} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductManagement;
