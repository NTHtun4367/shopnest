import ProductList from "../components/products/ProductList";

function Home() {
  return (
    <main>
      <section className="mt-16">
        <h1 className="text-2xl text-center font-bold mb-6">NEW ARRIVALS</h1>
        <ProductList />
      </section>
      <section className="mt-16">
        <h1 className="text-2xl text-center font-bold mb-6">BEST DEALS</h1>
        <ProductList />
      </section>
    </main>
  );
}

export default Home;
