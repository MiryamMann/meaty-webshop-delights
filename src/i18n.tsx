
import React, { createContext, useContext, useState, ReactNode } from "react";

// English and Hebrew translations
const translations = {
  en: {
    home: "Home",
    products: "Products",
    recipes: "Recipes",
    contact: "Contact",
    cart: "Cart",
    personal: "Personal Area",
    login: "Log in",
    menu: "View Menu",
    reserve: "Reserve a Table (What's your address?)",
    ourStory: "Our story",
    storyText: `The HaKar meat store chain began in the legendary old neighborhood of Sanhedria over 70 years ago. Since then, more branches have opened, and our meat has become the leading brand in kosher meats. With HaKar meats, you can turn any Shabbat or holiday meal at home into a premium chef-restaurant dish. To help you honor your table – we’ve gathered excellent chef recipes for you. So what’s left? Order HaKar meat straight to your home, follow the instructions, and enjoy a truly unique experience.`,
    exploreRecipes: "Explore Recipes",
    allProducts: "All Meat Products",
    filterCategory: "Filter by Category",
    categories: {
      All: "All",
      Beef: "Beef",
      Chicken: "Chicken",
      Frozen: "Frozen",
      Badatz: "Badatz",
      Rubin: "Rubin",
      "Other Hechsherim": "Other Hechsherim"
    },
    loading: "Loading products...",
    noProducts: "No products found in this category.",
    viewDetails: "View Details",
    payment: "Payment",
    paymentComing: "* Payment processing integration coming soon *",
    completeOrder: "Complete Order (Demo)",
    recipeTitle: "Meat Recipes",
    recipeNotFound: "Recipe not found",
    backToRecipes: "Back to all recipes",
    personalHeader: "Personal Area",
    personalDesc: "View your orders, update your details, and more.",
    contactUs: "Contact Us",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageSent: "✅ Message Sent!",
    thankYou: "✅ Thank you! Your message was sent.",
    messageSoon: "We'll get back to you shortly.",
    viaFormspree: "Messages will be sent via Formspree.",
    email: "Email",
    message: "Message",
    unknownProduct: "Unknown Product",
    notFound: "Product not found.",
    backToProducts: "Back to all products",
    addToCart: "Add to Cart",
    hechsher: "Hechsher",
    category: "Category",
  },
  he: {
    home: "בית",
    products: "מוצרים",
    recipes: "מתכונים",
    contact: "צור קשר",
    cart: "עגלה",
    personal: "אזור אישי",
    login: "התחברות",
    menu: "לתפריט",
    reserve: "הזמן שולחן (מה הכתובת שלך?)",
    ourStory: "הסיפור שלנו",
    storyText: `רשת חנויות הבשר הכשר הכּר נוסדה לפני למעלה מ-70 שנה בשכונת סנהדריה הוותיקה. מאז נפתחו סניפים נוספים ובשר הכּר הפך למותג מוביל בבשר הכשר. עם בשר הכּר תוכלו להפוך כל סעודה בבית, בשבת או בחג, למנה של מסעדת שף. כדי לכבד את השולחן שלכם - ריכזנו עבורכם מתכונים מעולים של שפים. מה נותר? הזמינו בשר הכּר עד הבית, פעלו לפי ההוראות ותיהנו מחוויה ייחודית באמת.`,
    exploreRecipes: "צפו במתכונים",
    allProducts: "מוצרי השף שלנו",
    filterCategory: "סנן לפי קטגוריה",
    categories: {
      All: "הכל",
      Beef: "בקר",
      Chicken: "עוף",
      Frozen: "קפוא",
      Badatz: "בד\"ץ",
      Rubin: "רובין",
      "Other Hechsherim": "הכשרים אחרים"
    },
    loading: "טוען מוצרים...",
    noProducts: "לא נמצאו מוצרים בקטגוריה זו.",
    viewDetails: "צפה בפרטים",
    payment: "תשלום",
    paymentComing: "* חיבור מערכת סליקה יתווסף בקרוב *",
    completeOrder: "סיים הזמנה (הדגמה)",
    recipeTitle: "מתכונים",
    recipeNotFound: "המתכון לא נמצא",
    backToRecipes: "חזרה לכל המתכונים",
    personalHeader: "אזור אישי",
    personalDesc: "צפה בהזמנותיך, עדכן פרטים ועוד.",
    contactUs: "צור קשר",
    sendMessage: "שלח הודעה",
    sending: "שולח...",
    messageSent: "✅ ההודעה נשלחה!",
    thankYou: "✅ תודה! ההודעה נשלחה.",
    messageSoon: "נחזור אליך בקרוב.",
    viaFormspree: "ההודעות יישלחו דרך Formspree.",
    email: "אימייל",
    message: "הודעה",
    unknownProduct: "מוצר לא נמצא",
    notFound: "המוצר לא נמצא.",
    backToProducts: "חזרה לכל המוצרים",
    addToCart: "הוסף לעגלה",
    hechsher: "הכשר",
    category: "קטגוריה",
  }
}

type Lang = "en" | "he";

interface I18nContextType {
  lang: Lang;
  t: (key: string, section?: string) => string;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  t: (key) => key,
  setLang: () => {}
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  function t(key: string, section?: string) {
    if (section && translations[lang][section] && typeof translations[lang][section] === 'object') {
      // @ts-ignore
      return translations[lang][section][key] ?? key;
    }
    // @ts-ignore
    return translations[lang][key] ?? key;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};
