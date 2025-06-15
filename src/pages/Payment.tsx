
import { Link } from "react-router-dom";

const Payment = () => (
  <>
    <main className="container py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      <p className="mb-4">* Payment processing integration coming soon *</p>
      <Link
        to="/thank-you"
        className="bg-primary text-primary-foreground px-6 py-3 rounded font-semibold shadow hover:bg-primary/90 transition"
      >
        Complete Order (Demo)
      </Link>
    </main>
  </>
);

export default Payment;
