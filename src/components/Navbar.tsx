
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Menu", path: "/products", icon: FileText },
  { name: "Recipes", path: "/recipes", icon: FileText },
  { name: "Cart", path: "/cart", icon: ShoppingCart },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 border-b border-wood/50 bg-black/50 backdrop-blur-lg transition-all duration-300 shadow-lg"
      )}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="container flex items-center justify-between py-5">
        <Link
          to="/"
          className="font-extrabold text-[2.2rem] uppercase tracking-[.18em] text-white hover:text-burgundy transition-colors duration-200"
          style={{
            letterSpacing: "0.25em",
            fontVariant: "all-small-caps",
            textShadow: "0 2px 10px rgba(0,0,0,0.10)",
          }}
        >
          MeatStore
        </Link>
        <ul className="flex gap-2 sm:gap-6 px-2 sm:px-4 py-1">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <li key={name} className="flex items-center">
              <Link
                to={path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-semibold tracking-tight hover:text-burgundy hover:bg-white/5",
                  pathname === path
                    ? "text-burgundy border-burgundy border-b-2 bg-white/10 shadow"
                    : "text-white/80"
                )}
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontWeight: pathname === path ? 700 : 500,
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 sm:gap-4 items-center">
          <Link
            to="/login"
            className="border border-burgundy text-burgundy font-semibold uppercase text-xs px-5 py-2 rounded-[10px] bg-white/10 transition-all hover:bg-burgundy hover:text-white shadow"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.08em" }}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="border border-burgundy text-white bg-burgundy font-semibold uppercase text-xs px-5 py-2 rounded-[10px] transition-all hover:bg-black hover:text-wood shadow"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.08em" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
