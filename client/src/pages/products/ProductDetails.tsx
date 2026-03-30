import DetailsSkeleton from "@/common/DetailsSkeleton";
import RatingConverter from "@/common/RatingConverter";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { addToCart } from "@/store/slices/cart";
import { useGetProductDetailsQuery } from "@/store/slices/productApi";
import type { ProductImage } from "@/types/product";
import { Minus, Plus, ShoppingCart } from "lucide-react";
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

  if (isLoading) return <DetailsSkeleton />;
  if (!product)
    return (
      <p className="text-center mt-20 font-semibold">Product not found.</p>
    );

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
      }),
    );
  };

  return (
    <section
      className={`flex ${
        isDesktop ? "flex-wrap" : "flex-col"
      } items-start justify-between mt-16`}
    >
      {/* Left side: Images section */}
      <div className={`${isDesktop ? "w-2/5" : "w-full px-6"}`}>
        <img
          src={selectedImage}
          alt={product.name}
          className={`w-full ${
            isDesktop ? "h-[500px]" : "h-[350px]"
          } object-cover rounded-lg`}
        />
        <div className="flex items-center gap-3 mt-4">
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
                className="w-full h-full object-cover rounded-sm"
                onClick={() => setSelectedImage(image.url)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Info */}
      <div
        className={`${isDesktop ? "w-3/5 ps-12 product-container" : "w-full px-6 pt-4 product-container"}`}
      >
        <div className="mb-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <RatingConverter count={product.rating_count} />
            <span className="text-sm text-gray-500">
              ({product.rating_count} reviews)
            </span>
          </div>

          <div
            className="text-gray-600 leading-relaxed pt-2"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <hr className="w-full border-gray-200 my-6" />

          <h2 className="text-sm font-bold uppercase text-gray-900 mb-3">
            Colors
          </h2>
          <div className="flex items-center gap-3">
            {product.colors.map((color: string, i: number) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  selectedColor === color
                    ? "ring-2 ring-black ring-offset-2"
                    : "hover:scale-110"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>

          <hr className="w-full border-gray-200 my-6" />

          <h2 className="text-sm font-bold uppercase text-gray-900 mb-3">
            Size
          </h2>
          <div className="flex items-center gap-3">
            {product.sizes.map((s: string, i: number) => (
              <div
                key={i}
                className={`text-sm font-semibold px-5 py-1 border-2 ${
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

          <hr className="w-full border-gray-200 my-6" />

          <p className="text-4xl font-black text-gray-900 mb-6">
            ${product.price}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-full p-1">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() =>
                  setQuantity((prev) => {
                    if (prev === 1) return 1;
                    else return prev - 1;
                  })
                }
              >
                <Minus className="w-6 h-6 cursor-pointer" />
              </button>
              <span className="text-lg font-bold w-10 text-center">
                {quantity}
              </span>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <Button
              className="flex-1 rounded-full py-6 cursor-pointer"
              size={"lg"}
              onClick={addToCartHandler}
            >
              <ShoppingCart />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
