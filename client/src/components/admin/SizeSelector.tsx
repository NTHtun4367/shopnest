import { Button } from "@/components/ui/button";

interface SizeSelectorProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

function SizeSelector({ sizes, onChange }: SizeSelectorProps) {
  const availableSizes = ["xs", "sm", "m", "lg", "xl", "xxl"];

  const toggleValue = (selectedSize: string) => {
    if (sizes.includes(selectedSize)) {
      onChange(sizes.filter((s) => s != selectedSize));
    } else {
      onChange([...sizes, selectedSize]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {availableSizes.map((size) => (
        <Button
          className={`cursor-pointer ${
            sizes.includes(size) &&
            "bg-primary text-white hover:bg-primary hover:text-white"
          }`}
          type="button"
          key={size}
          variant={"outline"}
          onClick={() => toggleValue(size)}
        >
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

export default SizeSelector;
