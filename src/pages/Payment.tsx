
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

const Payment = () => {
  const { t, lang } = useI18n();
  return (
    <main className="container py-10 max-w-2xl mx-auto" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6">{t("payment")}</h1>
      <p className="mb-4">{t("paymentComing")}</p>
      <Link
        to="/thank-you"
        className="bg-primary text-primary-foreground px-6 py-3 rounded font-semibold shadow hover:bg-primary/90 transition"
      >
        {t("completeOrder")}
      </Link>
    </main>
  );
};

export default Payment;
