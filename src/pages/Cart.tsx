
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Cart = () => (
  <>
    <Navbar />
    <main className="container py-12 max-w-2xl mx-auto animate-fade-in min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair">Your Cart</h1>
      <p className="text-lg text-wood mb-8 font-playfair">Your cart is currently empty.</p>
      <div className="mt-6 flex gap-6">
        <Link to="/products" className="text-burgundy underline font-semibold font-playfair hover:text-wood transition">
          Continue Shopping
        </Link>
        <Link to="/payment" className="bg-wood text-black px-6 py-3 rounded-lg font-semibold font-playfair shadow hover:bg-burgundy hover:text-white transition-all duration-200 hover:scale-105">
          Proceed to Payment
        </Link>
      </div>
    </main>
  </>
);

export default Cart;
