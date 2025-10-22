import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface ColorsPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

function ColorsPicker({ colors, onChange }: ColorsPickerProps) {
  const [inputColor, setInputColor] = useState("#000000");

  const addColor = () => {
    if (!colors.includes(inputColor)) {
      onChange([...colors, inputColor]);
    }
  };

  const removeColor = (selectedColor: string) => {
    onChange(colors.filter((color) => color !== selectedColor));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Input
          className="w-40"
          type="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
        />
        <Button type="button" onClick={addColor}>
          Add Color
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex items-center gap-1 p-1 border rounded-md"
          >
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm">{color}</span>
            <Button
              className="w-6 h-6 cursor-pointer"
              type="button"
              variant={"outline"}
              onClick={() => removeColor(color)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorsPicker;
