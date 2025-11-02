import RatingConverter from "@/common/RatingConverter";
import useMediaQuery from "@/hooks/useMediaQuery";
import { addToCart } from "@/store/slices/cart";
import { useGetProductDetailsQuery } from "@/store/slices/productApi";
import type { ProductImage } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { toast } from "sonner";

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: product, isLoading } = useGetProductDetailsQuery(id as string);

  useEffect(() => {
    if (product) {
      if (product.images.length > 0) setSelectedImage(product.images[0].url);
      if (product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const addToCartHandler = () => {
    toast.success("Product is added to cart.");
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
        price: product.price,
        quantity,
      })
    );
  };

  return (
    <section
      className={`flex ${
        isDesktop ? "flex-wrap" : "flex-col"
      } items-start justify-between mt-16`}
    >
      <div className={`${isDesktop ? "w-2/5" : "w-full px-6"}`}>
        <img
          src={selectedImage}
          alt={product.name}
          className={`w-full ${
            isDesktop ? "h-[450px]" : "h-[350px]"
          } object-cover rounded-lg`}
        />
        <div className="flex items-center gap-3 mt-3">
          {product.images.map((image: ProductImage, index: number) => (
            <div
              key={index}
              className={`${
                isDesktop ? "w-28 h-28" : "w-20 h-20"
              } object-cover border-2 border-gray-400 p-1 cursor-pointer rounded-md ${
                selectedImage === image.url && "border-dashed"
              }`}
            >
              <img
                src={image.url}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
                onClick={() => setSelectedImage(image.url)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`${isDesktop ? "w-3/5 ps-8 product-container" : "w-full px-6 pt-4"}`}>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <RatingConverter count={product.rating_count} />
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <hr className="w-full text-gray-600 my-4" />
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color: string, i: number) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full mt-2 cursor-pointer ${
                selectedColor === color && "border-2 border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>
        <hr className="w-full text-gray-600 my-4" />
        <h2 className="text-xl font-semibold">Size</h2>
        <div className="flex items-center gap-2">
          {product.sizes.map((s: string, i: number) => (
            <div
              key={i}
              className={`text-sm font-semibold px-5 py-1 mt-2 border-2 ${
                selectedSize === s
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-400 border-gray-400"
              } rounded-md cursor-pointer`}
              onClick={() => setSelectedSize(s)}
            >
              {s.toUpperCase()}
            </div>
          ))}
        </div>
        <hr className="w-full text-gray-600 my-4" />
        <p className="text-3xl font-bold">${product.price}</p>
        <hr className="w-full text-gray-600 my-4" />
        <div className="flex items-center gap-4 relative">
          <div className="flex items-center gap-2">
            <button
              className="bg-primary p-2 rounded-md text-white"
              onClick={() =>
                setQuantity((prev) => {
                  if (prev === 1) return 1;
                  else return prev - 1;
                })
              }
            >
              <Minus className="w-6 h-6 cursor-pointer" />
            </button>
            <span className="text-xl font-medium px-1">{quantity}</span>
            <button
              className="bg-primary p-2 rounded-md text-white"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <Plus className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <button
            className="w-full bg-primary text-white p-2 rounded-full cursor-pointer"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
