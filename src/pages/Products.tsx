
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
    <main className="container py-10">
      <h1 className="text-2xl font-bold mb-6">All Meat Products</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map(product => (
          <div
            key={product.id}
            className="bg-card border rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
              <Link
                to={`/products/${product.id}`}
                className="mt-2 inline-block text-sm text-primary underline hover:text-primary/80"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  </>
);

export default Products;
