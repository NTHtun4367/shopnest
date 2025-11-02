import type { ProductFilters, ProductMeta } from "@/types/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface ProductFilterDropDownProps {
  type: "colors" | "sizes";
  product_meta: ProductMeta;
  filters: ProductFilters;
  toggleValue: (key: "colors" | "sizes", value: string) => void;
}

function ProductFilterDropDown({
  type,
  product_meta,
  filters,
  toggleValue,
}: ProductFilterDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <Button
          className="w-full flex items-center justify-between"
          size={"sm"}
          variant={"outline"}
        >
          <span>{type === "colors" ? "Colors" : "Sizes"}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {type === "colors" ? (
          <>
            {product_meta?.colors.map((color, index) => (
              <DropdownMenuItem key={index}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-1"
                    onChange={() => toggleValue(type, color)}
                    checked={filters.colors.includes(color)}
                  />
                  <div
                    className="w-14 h-3 border border-gray-600 rounded-xs"
                    style={{ backgroundColor: color }}
                  />
                </label>
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          <>
            {product_meta?.sizes.map((size, index) => (
              <DropdownMenuItem key={index}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-1"
                    onChange={() => toggleValue(type, size)}
                    checked={filters.sizes.includes(size)}
                  />
                  <span className="text-sm">{size.toUpperCase()}</span>
                </label>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductFilterDropDown;
