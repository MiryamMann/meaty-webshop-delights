
import { Link } from "react-router-dom";

const recipes = [
  { id: "1", title: "Perfect Grilled Steak" },
  { id: "2", title: "BBQ Pulled Pork Sandwich" },
  { id: "3", title: "Herb Roasted Chicken" },
];

const Recipes = () => (
  <>
    <main className="container py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair">Meat Recipes</h1>
      <ul className="space-y-6">
        {recipes.map(recipe => (
          <li key={recipe.id} className="bg-card border border-wood rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 animate-fade-in">
            <div>
              <span className="text-lg font-bold font-playfair text-burgundy">{recipe.title}</span>
            </div>
            <Link
              to={`/recipes/${recipe.id}`}
              className="mt-2 md:mt-0 inline-block bg-burgundy text-white px-5 py-1.5 rounded font-playfair font-semibold shadow hover:bg-black hover:text-wood transition-all duration-200 hover:scale-105"
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
