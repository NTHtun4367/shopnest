import type { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface RecentProductProps {
  data: Product[];
}

function RecentProduct({ data }: RecentProductProps) {
  const recentProducts = [...data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
      </CardHeader>
      <CardContent>
        {recentProducts.map((product) => (
          <div className="flex items-center justify-between shadow p-2 my-2 rounded-lg">
            <h2 className="text-sm font-medium">{product.name}</h2>
            <Badge>{product.category}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentProduct;
