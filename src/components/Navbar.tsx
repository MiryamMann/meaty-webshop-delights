
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";

const Navbar = () => {
  const { t } = useI18n();
  return (
    <nav className="bg-secondary text-foreground py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Gourmet Meat Shop
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <Link to="/" className="hover:text-primary transition-colors duration-200">
            {t("home")}
          </Link>
          <Link to="/products" className="hover:text-primary transition-colors duration-200">
            {t("products")}
          </Link>
          <Link to="/recipes" className="hover:text-primary transition-colors duration-200">
            {t("recipes")}
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors duration-200">
            {t("contact")}
          </Link>
          <Link to="/cart" className="hover:text-primary transition-colors duration-200">
            {t("cart")}
          </Link>
          <Link to="/personal" className="hover:text-primary transition-colors duration-200">
            {t("personal")}
          </Link>
          <Link to="/Login" className="hover:text-primary transition-colors duration-200">
            {t("login")}
          </Link>
          <LanguageToggle />
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
