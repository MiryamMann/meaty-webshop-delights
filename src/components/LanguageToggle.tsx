
import { useI18n } from "@/i18n";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "he" : "en")}
      className="px-4 py-1 rounded bg-card border border-primary text-primary hover:bg-primary hover:text-white transition"
      aria-label="Change language"
      style={{ minWidth: 60, fontWeight: 600 }}
    >
      {lang === "en" ? "עברית" : "English"}
    </button>
  );
};

export default LanguageToggle;
