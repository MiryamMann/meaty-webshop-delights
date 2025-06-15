
import Navbar from "@/components/Navbar";

const Home = () => (
  <>
    <Navbar />
    <main className="container py-16 min-h-[70vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="w-full max-w-3xl text-center mb-10">
        <h1 className="text-[2.9rem] md:text-[3.8rem] font-bold mb-5 text-burgundy drop-shadow-[0_4px_14px_rgba(129,26,33,0.25)] leading-tight font-playfair animate-scale-in">
          The Finest Cuts of Meat Delivered to Your Table
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-wood font-playfair transition-all duration-300 animate-fade-in">
          Premium beef, pork, poultry and more — delivered with care and style for true connoisseurs.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1000&q=80"
        alt="Selection of meats"
        className="w-full max-w-2xl rounded-xl shadow-2xl mb-12 border-4 border-wood/80 animate-fade-in"
        style={{ boxShadow: "0 10px 32px 0 rgba(129,26,33,0.24)" }}
      />
      <div className="flex flex-wrap gap-6 justify-center mt-4">
        <a href="/products"
          className="bg-burgundy px-8 py-4 rounded-lg font-semibold font-playfair text-lg shadow-xl text-white hover:bg-black hover:text-wood transition-all duration-300 animate-fade-in hover:scale-105"
        >
          Shop All Products
        </a>
        <a href="/recipes"
          className="bg-wood text-black px-8 py-4 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-burgundy hover:text-white transition-all duration-300 animate-fade-in hover:scale-105"
        >
          See Meat Recipes
        </a>
      </div>
    </main>
  </>
);

export default Home;
