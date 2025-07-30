import RatingConverter from "@/common/RatingConverter";
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
  colors: ["#   ", "#0047fc"],
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
  const { id } = useParams();

  useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  return (
    <section className="grid grid-cols-2 gap-6 mt-24">
      <div className="w-4/5">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full object-cover rounded-md"
        />
        <div className="flex items-center gap-2 mt-2 w-full rounded-md">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`${
                selectedImage === image.url
                  ? "w-28 h-28 border-2 border-gray-400 rounded-md cursor-pointer"
                  : "w-28 h-28 border-2 border-gray-400 rounded-md opacity-35 cursor-pointer"
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
      <div>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <RatingConverter count={product.rating} />
        <p className="text-sm font-medium text-gray-600 mt-2">
          {product.description}
        </p>
        <hr className="w-full text-gray-600 my-4" />
        <h2>Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color, i) => (
            <div key={i} className={`w-6 h-6 bg-black rounded-full mt-2`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
