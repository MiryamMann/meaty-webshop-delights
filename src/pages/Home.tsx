import SectionDivider from "@/components/SectionDivider";
import { Link } from "react-router-dom";

const heroImg =
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80";

const Home = () => (
  <>
    <main className="container min-h-[90vh] flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="relative w-full max-w-3xl mx-auto mt-28 mb-14 rounded-xl shadow-2xl overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury selection of meats on wooden board"
          className="w-full h-[350px] md:h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center px-6 text-center">
          <h1
            className="text-[2.9rem] md:text-[3.5rem] font-extrabold uppercase tracking-widest text-white leading-tight font-playfair drop-shadow"
            style={{ letterSpacing: ".17em" }}
          >
            The Fine Art of <span className="text-burgundy">Meat</span>
          </h1>
          <p
            className="text-xl md:text-2xl mt-4 text-white/80 font-playfair"
            style={{ letterSpacing: ".04em" }}
          >
            Cook chef-style meat at home with premium raw cuts delivered to your door
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <a
              href="/products"
              className="border-2 border-burgundy text-burgundy bg-transparent px-8 py-3 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-burgundy hover:text-white transition-all duration-200"
              style={{ letterSpacing: ".06em" }}
            >
              View Menu
            </a>
            <Link
              to="/personal"
              className="border-2 border-wood text-wood bg-black/50 px-8 py-3 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-wood hover:text-black transition-all duration-200"
              style={{ letterSpacing: ".06em" }}
            >
              Reserve a Table (What's your address?)
            </Link>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Recipes CTA */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-burgundy font-playfair mb-5 uppercase">
         Our story
        </h2>
        <p className="text-lg mb-7 text-wood/90">
The HaKar meat store chain began in the legendary old neighborhood of Sanhedria over 70 years ago. Since then, more branches have opened, and our meat has become the leading brand in kosher meats. With HaKar meats, you can turn any Shabbat or holiday meal at home into a premium chef-restaurant dish. To help you honor your table 
– we’ve gathered excellent chef recipes for you. So what’s left? Order HaKar meat straight to your home,
 follow the instructions, and enjoy a truly unique experience.

        </p>
        <a
          href="/recipes"
          className="inline-block border-2 border-wood text-burgundy px-8 py-3 font-semibold rounded-lg font-playfair text-lg shadow hover:bg-burgundy hover:text-white transition"
        >
          Explore Recipes
        </a>
      </section>
    </main>
  </>
);

export default Home;
