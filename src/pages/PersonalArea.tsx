
import ProfileManagement from "@/components/ProfileManagement";
import { useI18n } from "@/i18n";

const PersonalArea = () => {
  const { t, lang } = useI18n();
  return (
    <main className="container py-10 max-w-2xl mx-auto" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-4">{t("personalHeader")}</h1>
      <p className="mb-2">{t("personalDesc")}</p>
      <ProfileManagement />
      {/* Placeholder for orders, profile form, etc. */}
    </main>
  );
};

export default PersonalArea;
