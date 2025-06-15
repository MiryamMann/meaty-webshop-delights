
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsyncAction } from "@/store/productsSlice";
import type { RootState } from "@/store";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchDataAsyncAction() as any);
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="container py-12 min-h-[70vh] animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair drop-shadow">All Meat Products</h1>
        {loading && <div>Loading products...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product:any) => (
            <div
              key={product.id}
              className="bg-card border border-wood rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-6 animate-fade-in"
              style={{ fontFamily: `'Playfair Display', serif` }}
            >
              <h2 className="text-xl font-bold text-burgundy mb-2">{product.name}</h2>
              <p className="text-lg font-playfair text-wood font-bold mb-2">${product.price?.toFixed(2) ?? 'N/A'}</p>
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
};

export default Products;
