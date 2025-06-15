
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "All Products", path: "/products", icon: ShoppingCart },
  { name: "Cart", path: "/cart", icon: ShoppingCart },
  { name: "Personal Area", path: "/personal", icon: User },
  { name: "Recipes", path: "/recipes", icon: FileText },
  { name: "Login", path: "/login", icon: User },
  { name: "Sign Up", path: "/signup", icon: User },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className={cn(
      "w-full border-b border-wood bg-black/90 shadow-lg animate-fade-in",
      "backdrop-blur-md"
    )}>
      <div className="container flex items-center justify-between py-4">
        <Link
          to="/"
          className="font-bold text-2xl text-burgundy hover:text-wood transition-transform duration-300 tracking-tight animate-scale-in"
          style={{ fontFamily: `'Playfair Display', serif`, letterSpacing: "-1px" }}
        >
          MeatStore
        </Link>
        <ul className="flex gap-1 sm:gap-6 rounded-xl bg-wood/60 px-2 sm:px-6 py-1 backdrop-blur-lg animate-fade-in">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link
                to={path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md group hover:scale-110 transition-transform duration-250 font-semibold",
                  pathname === path
                    ? "bg-burgundy text-white shadow-lg"
                    : "text-black/70 hover:bg-burgundy/80 hover:text-white"
                )}
                style={{
                  fontFamily: `'Playfair Display', serif`
                }}
              >
                <Icon className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
                <span className="hidden sm:inline tracking-tight">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
