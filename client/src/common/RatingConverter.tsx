import { Star } from "lucide-react";

interface RatingConverterProps {
  count: number;
}

function RatingConverter({ count }: RatingConverterProps) {
  return (
    <div className="flex items-center gap-1 mb-1">
      {Array.from({ length: count > 5 ? 5 : count }).map((_, i) => (
        <Star key={i} className="fill-yellow-400 text-yellow-400 w-3 h-3" />
      ))}
    </div>
  );
}

export default RatingConverter;
