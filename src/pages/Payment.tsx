import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { processPayment } from "../redux/paymentSlice";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";

const Payment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const client = useAppSelector((state) => state.client.client);
  const payment = useAppSelector((state) => state.payment);

  const handlePayment = async () => {
    if (!client) {
      alert("Client not found. Please login first.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.pricePerKilo * item.quantity,
      0
    );

    const orderData = {
      orderDate: new Date().toISOString(),
      totalPrice,
      statusId: 1,
      orderItems,
      existingClientId: client.clientId ?? null,
      client: client.clientId ? null : {
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        password: client.password,
        phoneNumber: client.phoneNumber,
        address: {
          street: client.address.street,
          city: client.address.city,
          zipCode: client.address.zipCode,
          buildingNumber: client.address.buildingNumber,
        }
      }
    };

    console.log("Sending orderData:", orderData);

    const resultAction = await dispatch(processPayment(orderData));
    if (processPayment.fulfilled.match(resultAction)) {
      navigate("/thank-you");
    } else {
      console.error("❌ Payment failed:", resultAction.payload);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <main
      className="min-h-screen pt-24 px-6"
      dir={lang === "he" ? "rtl" : "ltr"}
    >
      <section className="bg-white text-black p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("payment")}</h1>
        <p className="mb-4">{t("paymentComing")}</p>
        <button
          onClick={handlePayment}
          disabled={payment.loading || cartItems.length === 0}
          className="bg-primary text-white py-3 px-6 rounded shadow hover:bg-primary/90 transition"
        >
          {payment.loading ? t("processing") || "Processing..." : t("completeOrder")}
        </button>
      </section>
    </main>
  );
};

export default Payment;
