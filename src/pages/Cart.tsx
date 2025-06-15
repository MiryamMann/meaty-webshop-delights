import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { setAuthRedirectTarget } from "../redux/userSlice";
import type { RootState, AppDispatch } from "../redux/store";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

const { cartItems } = useSelector((state: RootState) => state.cart);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      dispatch(setAuthRedirectTarget("/payment"));
      navigate("/login");
    } else {
      navigate("/payment");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.pricePerKilo * item.quantity, 0);

  return (
    <>
      <main className="container py-12 max-w-2xl mx-auto animate-fade-in min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-wood mb-8 font-playfair">Your cart is currently empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-playfair text-wood">{item.name}</p>
                    <p className="text-sm text-gray-500">מחיר: {item.pricePerKilo} ₪</p>
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-wood">
                    {(item.pricePerKilo * item.quantity).toFixed(2)} ₪
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right text-xl font-bold mb-6 text-burgundy">
              Total: {totalPrice.toFixed(2)} ₪
            </div>

            <div className="flex gap-6">
              <Link
                to="/products"
                className="text-burgundy underline font-semibold font-playfair hover:text-wood transition"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                className="bg-wood text-black px-6 py-3 rounded-lg font-semibold font-playfair shadow hover:bg-burgundy hover:text-white transition-all duration-200 hover:scale-105"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;
