import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => (
  <nav className="bg-secondary text-foreground py-4 shadow-md sticky top-0 z-10">
    <div className="container mx-auto flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-primary">
        Gourmet Meat Shop
      </Link>
      <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-primary transition-colors duration-200">
          Home
        </Link>
        <Link to="/products" className="hover:text-primary transition-colors duration-200">
          Products
        </Link>
        <Link to="/recipes" className="hover:text-primary transition-colors duration-200">
          Recipes
        </Link>
        <Link to="/contact" className="hover:text-primary transition-colors duration-200">
          Contact
        </Link>
        <Link to="/cart" className="hover:text-primary transition-colors duration-200">
          Cart
        </Link>
        <Link to="/personal" className="hover:text-primary transition-colors duration-200">
          Personal Area
        </Link>
        <Link to="/Login" className="hover:text-primary transition-colors duration-200">
          Log in
        </Link>
        <DarkModeToggle />
      </div>
    </div>
  </nav>
);

export default Navbar;
