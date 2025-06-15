
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, User, FileText, Recipe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "All Products", path: "/products", icon: ShoppingCart },
  { name: "Cart", path: "/cart", icon: ShoppingCart },
  { name: "Personal Area", path: "/personal", icon: User },
  { name: "Recipes", path: "/recipes", icon: FileText },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="w-full bg-card border-b border-border shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <span className="font-bold text-xl text-primary">MeatStore</span>
        <ul className="flex gap-3 md:gap-6">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link
                to={path}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded hover:bg-accent transition-colors",
                  pathname === path ? "bg-accent text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
