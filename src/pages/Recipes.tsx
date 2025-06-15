
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

const recipes = [
  { id: "1", title: { en: "Perfect Grilled Steak", he: "סטייק על האש מושלם" } },
  { id: "2", title: { en: "BBQ Pulled Pork Sandwich", he: "סנדוויץ' בשר מפורק ברביקיו" } },
  { id: "3", title: { en: "Herb Roasted Chicken", he: "עוף בתנור עם עשבי תיבול" } },
];

const Recipes = () => {
  const { t, lang } = useI18n();
  return (
    <main className="container py-12 animate-fade-in" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair">{t("recipeTitle")}</h1>
      <ul className="space-y-6">
        {recipes.map(recipe => (
          <li key={recipe.id} className="bg-card border border-wood rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 animate-fade-in">
            <div>
              <span className="text-lg font-bold font-playfair text-burgundy">{recipe.title[lang]}</span>
            </div>
            <Link
              to={`/recipes/${recipe.id}`}
              className="mt-2 md:mt-0 inline-block bg-burgundy text-white px-5 py-1.5 rounded font-playfair font-semibold shadow hover:bg-black hover:text-wood transition-all duration-200 hover:scale-105"
            >
              {lang === "he" ? "למתכון" : "View Recipe"}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Recipes;
