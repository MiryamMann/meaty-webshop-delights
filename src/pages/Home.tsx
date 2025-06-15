
import Navbar from "@/components/Navbar";

const Home = () => (
  <>
    <Navbar />
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Meat Store</h1>
      <p className="text-muted-foreground mb-8">
        Premium cuts of beef, pork, poultry, and more — delivered directly to your door!
      </p>
      <img
        src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
        alt="Selection of meats"
        className="w-full max-w-2xl rounded-lg shadow mb-10 mx-auto"
      />
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/products" className="bg-primary text-primary-foreground rounded px-6 py-3 font-semibold shadow hover:bg-primary/90 transition">
          Shop All Products
        </a>
        <a href="/recipes" className="bg-accent text-accent-foreground rounded px-6 py-3 font-semibold shadow hover:bg-accent/80 transition">
          See Meat Recipes
        </a>
      </div>
    </main>
  </>
);

export default Home;
