import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const CATEGORIES = [
  {
    id: "t-shirt",
    label: "T-Shirt",
  },
  {
    id: "hoodie",
    label: "Hoodie",
  },
  {
    id: "gym",
    label: "Gym",
  },
  {
    id: "shorts",
    label: "Shorts",
  },
  {
    id: "jeans",
    label: "Jeans",
  },
];

function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map((category) => (
          <SelectItem value={category.id} key={category.id}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
