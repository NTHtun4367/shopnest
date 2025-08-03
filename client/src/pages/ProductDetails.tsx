import RatingConverter from "@/common/RatingConverter";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const product = {
  id: 1,
  name: "Black T-Shirt",
  price: 200,
  category: "T-Shirt",
  description:
    "Nullam nec turpis et arcu egestas commodo. Integer sit amet metus non tortor tincidunt interdum. Donec et metus mollis, ultricies est at, ultricies nulla. Morbi non libero magna. Praesent imperdiet magna ac ipsum cursus, ut fermentum turpis tincidunt.",
  size: ["S", "M", "L"],
  colors: ["#331616", "#25464f", "#edde3b"],
  rating: 5,
  images: [
    {
      url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
    },
    {
      url: "https://img.sonofatailor.com/images/customizer/product/highneck/DeepBlue_Regular.jpg",
    },
    {
      url: "https://bdci.imgix.net/i/eea8fe4a_5%20pack%202.jpg?fit=fill&w=500&h=500&bg=fff&q=90&nrs=80",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOTXl4SbFGBY1CFkOz8d0sU5KPXhzRscB-2TVQ1XeFboC3kcx-5ClMxhDliOPObvlLANM&usqp=CAU",
    },
  ],
};

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.size[0]);
  const { id } = useParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

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
          {product.images.map((image, index) => (
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
      <div className={`${isDesktop ? "w-3/5 ps-8" : "w-full px-6 pt-4"}`}>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <RatingConverter count={product.rating} />
        <p className="text-sm font-medium text-gray-600 mt-2">
          {product.description}
        </p>
        <hr className="w-full text-gray-600 my-4" />
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full mt-2 cursor-pointer ${
                selectedColor === color && "border-2 border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <hr className="w-full text-gray-600 my-4" />
        <h2 className="text-xl font-semibold">Size</h2>
        <div className="flex items-center gap-2">
          {product.size.map((s, i) => (
            <div
              key={i}
              className={`text-sm font-semibold px-5 py-1 mt-2 border-2 ${
                selectedSize === s
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-400 border-gray-400"
              } rounded-md cursor-pointer`}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </div>
          ))}
        </div>
        <hr className="w-full text-gray-600 my-4" />
        <p className="text-3xl font-bold">${product.price}</p>
        <hr className="w-full text-gray-600 my-4" />
        <div className="flex items-center gap-4 relative">
          <div className="flex items-center gap-2">
            <button className="bg-primary p-2 rounded-md text-white">
              <Minus className="w-6 h-6 cursor-pointer" />
            </button>
            <span className="text-xl font-medium px-1">1</span>
            <button className="bg-primary p-2 rounded-md text-white">
              <Plus className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <button className="w-full bg-primary text-white p-2 rounded-full cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
