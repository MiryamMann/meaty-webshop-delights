
import { useParams, Link } from "react-router-dom";

const recipeDetails = {
  "1": {
    title: "Perfect Grilled Steak",
    description: "A simple yet delicious grilled steak recipe.",
    steps: [
      "Let the steak come to room temperature.",
      "Season with salt & pepper.",
      "Grill over high heat to your preferred doneness.",
      "Rest the steak 5 minutes before serving."
    ]
  },
  "2": {
    title: "BBQ Pulled Pork Sandwich",
    description: "Slow cooked, juicy pulled pork for the perfect BBQ sandwich.",
    steps: [
      "Rub pork shoulder with spices.",
      "Cook in slow cooker for 8 hours.",
      "Shred meat and mix with BBQ sauce.",
      "Serve on toasted buns."
    ]
  },
  "3": {
    title: "Herb Roasted Chicken",
    description: "Crispy skin, juicy herb-roasted chicken.",
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Rub chicken with herbs, garlic, and oil.",
      "Roast until internal temp is 165°F (74°C).",
      "Let rest before carving."
    ]
  },
};

const Recipe = () => {
  const { id } = useParams();
  const recipe = recipeDetails[id ?? ""] || { title: "Recipe not found", description: "", steps: [] };
  return (
    <>
[]      <main className="container py-10 max-w-2xl mx-auto animate-fade-in min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-3 text-burgundy font-playfair">{recipe.title}</h1>
        <div className="mb-4 text-wood text-lg font-playfair">{recipe.description}</div>
        <ol className="list-decimal pl-6 mb-8 space-y-2 font-playfair text-wood">
          {(recipe.steps || []).map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
        <Link to="/recipes" className="text-burgundy underline font-semibold font-playfair hover:text-wood transition">Back to all recipes</Link>
      </main>
    </>
  );
};

export default Recipe;
