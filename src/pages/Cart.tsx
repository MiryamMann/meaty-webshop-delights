
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Cart = () => (
  <>
    <Navbar />
    <main className="container py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <p className="text-muted-foreground">Your cart is currently empty.</p>
      <div className="mt-6 flex gap-4">
        <Link to="/products" className="text-primary underline">Continue Shopping</Link>
        <Link to="/payment" className="bg-primary text-primary-foreground px-4 py-2 rounded font-semibold shadow hover:bg-primary/90 transition">
          Proceed to Payment
        </Link>
      </div>
    </main>
  </>
);

export default Cart;
