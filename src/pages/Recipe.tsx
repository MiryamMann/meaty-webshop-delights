
import { useParams, Link } from "react-router-dom";
import { useI18n } from "@/i18n";

const recipeDetails = {
  "1": {
    title: { en: "Perfect Grilled Steak", he: "סטייק על האש מושלם" },
    description: {
      en: "A simple yet delicious grilled steak recipe.",
      he: "מתכון פשוט וטעים לסטייק על האש."
    },
    steps: {
      en: [
        "Let the steak come to room temperature.",
        "Season with salt & pepper.",
        "Grill over high heat to your preferred doneness.",
        "Rest the steak 5 minutes before serving."
      ],
      he: [
        "הוציאו את הסטייק לטמפרטורת החדר.",
        "תבלו במלח ופלפל.",
        "צלוי על אש גבוהה עד לרמת העשייה הרצויה.",
        "הניחו לנוח 5 דקות לפני ההגשה."
      ]
    }
  },
  "2": {
    title: { en: "BBQ Pulled Pork Sandwich", he: "סנדוויץ' בשר מפורק ברביקיו" },
    description: {
      en: "Slow cooked, juicy pulled pork for the perfect BBQ sandwich.",
      he: "בשר מפורק בתבשיל איטי לכריך ברביקיו מושלם."
    },
    steps: {
      en: [
        "Rub pork shoulder with spices.",
        "Cook in slow cooker for 8 hours.",
        "Shred meat and mix with BBQ sauce.",
        "Serve on toasted buns."
      ],
      he: [
        "תבלו את הכתף בתבלינים.",
        "בשלו בסיר איטי במשך 8 שעות.",
        "פוררו את הבשר וערבבו עם רוטב ברביקיו.",
        "הגישו בלחמניות קלויות."
      ]
    }
  },
  "3": {
    title: { en: "Herb Roasted Chicken", he: "עוף בתנור עם עשבי תיבול" },
    description: {
      en: "Crispy skin, juicy herb-roasted chicken.",
      he: "עוף עסיסי עם עשבי תיבול, עור פריך."
    },
    steps: {
      en: [
        "Preheat oven to 400°F (200°C).",
        "Rub chicken with herbs, garlic, and oil.",
        "Roast until internal temp is 165°F (74°C).",
        "Let rest before carving."
      ],
      he: [
        "חממו תנור ל־200°C.",
        "עסו את העוף בעשבי תיבול, שום ושמן.",
        "צלוי עד שהטמפ' הפנימית היא 74°C.",
        "הניחו לעוף לנוח לפני החיתוך."
      ]
    }
  },
};

const Recipe = () => {
  const { id } = useParams();
  const { t, lang } = useI18n();
  const recipe = recipeDetails[id ?? ""] || {
    title: { en: t("recipeNotFound"), he: t("recipeNotFound") },
    description: { en: "", he: "" },
    steps: { en: [], he: [] },
  };
  return (
    <main className="container py-10 max-w-2xl mx-auto animate-fade-in min-h-[60vh]" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-3 text-burgundy font-playfair">{recipe.title[lang]}</h1>
      <div className="mb-4 text-wood text-lg font-playfair">{recipe.description[lang]}</div>
      <ol className="list-decimal pl-6 mb-8 space-y-2 font-playfair text-wood">
        {recipe.steps[lang].map((step: string, idx: number) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
      <Link to="/recipes" className="text-burgundy underline font-semibold font-playfair hover:text-wood transition">{t("backToRecipes")}</Link>
    </main>
  );
};

export default Recipe;
