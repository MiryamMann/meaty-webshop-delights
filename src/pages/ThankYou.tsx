
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const ThankYou = () => (
  <>
    <Navbar />
    <main className="container py-10 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
      <p className="mb-8 text-lg text-muted-foreground">Your order will be delivered soon.</p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground px-6 py-3 rounded font-semibold shadow hover:bg-primary/90 transition"
      >
        Back to Home
      </Link>
    </main>
  </>
);

export default ThankYou;
