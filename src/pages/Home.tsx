
import SectionDivider from "@/components/SectionDivider";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

const heroImg =
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80";

const Home = () => {
  const { t, lang } = useI18n();
  return (
    <main className="container min-h-[90vh] flex flex-col justify-center items-center" dir={lang === "he" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div className="relative w-full max-w-3xl mx-auto mt-28 mb-14 rounded-xl shadow-2xl overflow-hidden">
        <img
          src={heroImg}
          alt={lang === "he" ? "מבחר בשרים יוקרתי על קרש עץ" : "Luxury selection of meats on wooden board"}
          className="w-full h-[350px] md:h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center px-6 text-center">
          <h1
            className="text-[2.9rem] md:text-[3.5rem] font-extrabold uppercase tracking-widest text-white leading-tight font-playfair drop-shadow"
            style={{ letterSpacing: ".17em" }}
          >
            {lang === "he"
              ? <>אומנות <span className="text-burgundy">הבשר</span></>
              : <>The Fine Art of <span className="text-burgundy">Meat</span></>
            }
          </h1>
          <p
            className="text-xl md:text-2xl mt-4 text-white/80 font-playfair"
            style={{ letterSpacing: ".04em" }}
          >
            {lang === "he"
              ? "בשלו כמו שפים במטבח שלכם, עם בשרי הקר במשלוח עד הבית" 
              : "Cook chef-style meat at home with premium raw cuts delivered to your door"}
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <a
              href="/products"
              className="border-2 border-burgundy text-burgundy bg-transparent px-8 py-3 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-burgundy hover:text-white transition-all duration-200"
              style={{ letterSpacing: ".06em" }}
            >
              {t("menu")}
            </a>
            <Link
              to="/personal"
              className="border-2 border-wood text-wood bg-black/50 px-8 py-3 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-wood hover:text-black transition-all duration-200"
              style={{ letterSpacing: ".06em" }}
            >
              {t("reserve")}
            </Link>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Recipes CTA */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-burgundy font-playfair mb-5 uppercase">
          {t("ourStory")}
        </h2>
        <p className="text-lg mb-7 text-wood/90">{t("storyText")}</p>
        <a
          href="/recipes"
          className="inline-block border-2 border-wood text-burgundy px-8 py-3 font-semibold rounded-lg font-playfair text-lg shadow hover:bg-burgundy hover:text-white transition"
        >
          {t("exploreRecipes")}
        </a>
      </section>
    </main>
  );
};

export default Home;

