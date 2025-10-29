import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/slices/cart";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";

interface CartItemProps {
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  productKey: string;
}

function CartItem({
  name,
  image,
  size,
  color,
  price,
  quantity,
  productKey,
}: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-300 mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={image} alt={name} className="w-24 h-24 rounded-md" />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-xs my-1">Size - {size}</p>
            <p className="text-xs my-1">Color - {color}</p>
            <p className="font-bold">${price}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-8">
          <Trash
            className="text-red-600 cursor-pointer"
            onClick={() => dispatch(removeFromCart(productKey))}
          />
          <div className="flex items-center gap-2">
            <button
              className="primary-bg p-1 rounded-md text-white"
              onClick={() => dispatch(decreaseQuantity(productKey))}
            >
              <Minus className="w-5 h-5 cursor-pointer" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              className="primary-bg p-1 rounded-md text-white"
              onClick={() => dispatch(increaseQuantity(productKey))}
            >
              <Plus className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
