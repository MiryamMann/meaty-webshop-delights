
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const sampleProducts = [
  { id: "1", name: "Ribeye Steak", price: 29.99 },
  { id: "2", name: "Pork Chops", price: 19.99 },
  { id: "3", name: "Chicken Breast", price: 14.99 },
];

const Products = () => (
  <>
    <Navbar />
    <main className="container py-12 min-h-[70vh] animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair drop-shadow">All Meat Products</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map(product => (
          <div
            key={product.id}
            className="bg-card border border-wood rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-6 animate-fade-in"
            style={{ fontFamily: `'Playfair Display', serif` }}
          >
            <h2 className="text-xl font-bold text-burgundy mb-2">{product.name}</h2>
            <p className="text-lg font-playfair text-wood font-bold mb-2">${product.price.toFixed(2)}</p>
            <Link
              to={`/products/${product.id}`}
              className="inline-block bg-burgundy text-white font-semibold font-playfair px-6 py-2 mt-2 rounded shadow hover:bg-black hover:text-wood transition-all duration-200 hover:scale-105"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  </>
);

export default Products;
