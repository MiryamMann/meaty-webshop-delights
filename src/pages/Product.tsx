import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataAsyncAction } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import ProductReviews from "@/components/ProductReviews";
import type { AppDispatch, RootState } from "../redux/store"; // 👈 ייבוא טיפוסים

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>(); // ✅ טיפוס מדויק ל־dispatch
  const { items, loading, error } = useSelector((state: RootState) => state.products); // ✅ שימוש עם RootState

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchDataAsyncAction());
    }
  }, [dispatch, items]);

  const product = items.find((item) => item.id.toString() === id);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        quantity: 1,
        pricePerKilo: Number(product.pricePerKilo) || 0,
      })
    );
  };

  return (
    <>
      <main className="container py-10 max-w-2xl mx-auto min-h-[60vh] animate-fade-in">
        {loading && <p className="text-center text-wood">טוען מוצר...</p>}
        {error && <p className="text-red-500 text-center">שגיאה: {error}</p>}

        {!loading && !product && (
          <>
            <h1 className="text-3xl font-bold text-burgundy font-playfair mb-2">Unknown Product</h1>
            <p className="text-wood mb-4">Product not found.</p>
            <Link to="/products" className="text-burgundy underline hover:text-wood transition">Back to all products</Link>
          </>
        )}

        {product && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-burgundy font-playfair">{product.name}</h1>
            <div className="mb-4 text-wood text-xl font-playfair">{product.description}</div>
            <div className="font-bold text-2xl mb-6 text-wood">{product.pricePerKilo} ₪</div>

            <p className="text-sm text-wood mb-2"><strong>הכשר:</strong> {product.hechsher}</p>
            <p className="text-sm text-wood mb-6"><strong>קטגוריה:</strong> {product.Category}</p>

            <button
              onClick={handleAddToCart}
              className="bg-burgundy text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-black hover:text-wood transition-all duration-300 mb-8 animate-scale-in"
            >
              Add to Cart
            </button>

            <ProductReviews productId={id ?? "unknown"} />
            <div>
              <Link to="/products" className="text-wood underline hover:text-burgundy transition">
                Back to all products
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Product;
