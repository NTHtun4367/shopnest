import { Link } from "react-router";
import RatingConverter from "../../common/RatingConverter";

interface ProductCardProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  ratingCount: number;
}

function ProductCard({
  _id,
  name,
  image,
  price,
  ratingCount,
}: ProductCardProps) {
  return (
    <Link to={`/products/${_id}`} className="bg-gray-100 rounded-lg p-3">
      <img src={image} alt={name} className="rounded-md" />
      <p className="font-medium mt-2 mb-1">{name}</p>
      <RatingConverter count={ratingCount} />
      <p className="font-bold">${price}</p>
    </Link>
  );
}

export default ProductCard;
