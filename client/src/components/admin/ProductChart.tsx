import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ProductChartProps {
  data: Product[];
}

function ProductChart({ data }: ProductChartProps) {
  const monthMap: { [month: string]: number } = {};

  for (const product of data) {
    const month = new Date(product.createdAt).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });
    if (!monthMap[month]) monthMap[month] = 0;
    monthMap[month]++;
  }

  const chartData = Object.entries(monthMap).map(([month, count]) => ({
    month,
    count,
  }));

  const chartConfig = {
    date: {
      label: "Date",
      color: "#2563eb",
    },
    count: {
      label: "Count",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product added per month</CardTitle>
        <CardDescription>See your product stock rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
          <AreaChart data={chartData} accessibilityLayer>
            <XAxis dataKey={"month"} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey={"count"}
              type={"linear"}
              fill="url(#fillCount)"
              stroke="#2563eb"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ProductChart;
