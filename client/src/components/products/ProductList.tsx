import useMediaQuery from "../../hooks/useMediaQuery";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Black T-Shirt",
    price: 200,
    category: "T-Shirt",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 5,
    images: [
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
    ],
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: 300,
    category: "Hoodie",
    size: ["S", "M", "L"],
    colors: ["White", "Black"],
    rating: 4,
    images: [
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
    ],
  },
  {
    id: 3,
    name: "White Shorts",
    price: 250,
    category: "Shorts",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 3,
    images: [
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
    ],
  },
  {
    id: 4,
    name: "Taiwan Jeans",
    price: 350,
    category: "Jeans",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 4,
    images: [
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
    ],
  },
  {
    id: 5,
    name: "Gym Shorts",
    price: 220,
    category: "Gym",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 5,
    images: [
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
      {
        url: "https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
      },
    ],
  },
];

function ProductList() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const gridMedia = isDesktop ? "grid grid-cols-5 gap-6" : "grid grid-cols-2 mx-6 gap-2";

  return (
    <main className={gridMedia}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          image={product.images[0].url}
          price={product.price}
          ratingCount={product.rating}
        />
      ))}
    </main>
  );
}

export default ProductList;
