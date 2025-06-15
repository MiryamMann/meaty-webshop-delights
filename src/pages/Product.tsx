
import Navbar from "@/components/Navbar";
import { useParams, Link } from "react-router-dom";

const productDetails = {
  "1": { name: "Ribeye Steak", price: 29.99, description: "Tender, juicy ribeye steak, perfect for grilling." },
  "2": { name: "Pork Chops", price: 19.99, description: "Savory pork chops, great for any meal." },
  "3": { name: "Chicken Breast", price: 14.99, description: "Lean chicken breast, high in protein." },
};

const Product = () => {
  const { id } = useParams();
  const prod = productDetails[id ?? ""] || {
    name: "Unknown Product",
    price: 0,
    description: "Product not found.",
  };
  return (
    <>
      <Navbar />
      <main className="container py-10 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{prod.name}</h1>
        <div className="mb-4 text-muted-foreground">{prod.description}</div>
        <div className="font-bold text-2xl mb-6">${prod.price.toFixed(2)}</div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded font-semibold shadow hover:bg-primary/90 transition mb-6">
          Add to Cart
        </button>
        <div>
          <Link to="/products" className="text-primary underline">Back to all products</Link>
        </div>
      </main>
    </>
  );
};

export default Product;
