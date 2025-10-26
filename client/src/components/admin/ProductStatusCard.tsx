import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface ProductStatusCardProps {
  title: string;
  iconColor?: string;
  isLoading: boolean;
  value: number;
}

function ProductStatusCard({
  title,
  iconColor = "text-muted-foreground",
  isLoading,
  value,
}: ProductStatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Package className={`w-4 h-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="text-2xl font-bold">{value}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductStatusCard;
