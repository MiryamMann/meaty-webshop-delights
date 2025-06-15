
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const recipes = [
  { id: "1", title: "Perfect Grilled Steak" },
  { id: "2", title: "BBQ Pulled Pork Sandwich" },
  { id: "3", title: "Herb Roasted Chicken" },
];

const Recipes = () => (
  <>
    <Navbar />
    <main className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Meat Recipes</h1>
      <ul className="space-y-4">
        {recipes.map(recipe => (
          <li key={recipe.id} className="bg-card border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow">
            <div>
              <span className="text-lg font-semibold">{recipe.title}</span>
            </div>
            <Link
              to={`/recipes/${recipe.id}`}
              className="mt-2 md:mt-0 inline-block text-primary underline hover:text-primary/80"
            >
              View Recipe
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export default Recipes;
