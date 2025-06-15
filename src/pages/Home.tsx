
import SectionDivider from "@/components/SectionDivider";

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
          <h1 className="text-[2.9rem] md:text-[3.5rem] font-extrabold uppercase tracking-widest text-white leading-tight font-playfair drop-shadow" style={{letterSpacing: ".17em"}}>
            The Fine Art of <span className="text-burgundy">Meat</span>
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-white/80 font-playfair" style={{letterSpacing: ".04em"}}>
            Experience gourmet cuts & service <span className="text-wood">worthy of a chef's table.</span>
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <a
              href="/products"
              className="border-2 border-burgundy text-burgundy bg-transparent px-8 py-3 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-burgundy hover:text-white transition-all duration-200"
              style={{letterSpacing: ".06em"}}
            >
              View Menu
            </a>
            <a
              href="#"
              className="border-2 border-wood text-wood bg-black/50 px-8 py-3 rounded-lg font-semibold font-playfair text-lg shadow hover:bg-wood hover:text-black transition-all duration-200"
              style={{letterSpacing: ".06em"}}
              tabIndex={-1}
              aria-disabled
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </div>
      <SectionDivider />

      {/* Chef's Picks Section */}
      <section className="w-full max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-burgundy tracking-wide font-playfair text-center mb-8 uppercase">Chef's Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {[
            {
              name: "Ribeye Steak",
              desc: "Marbled, hand-selected steak for true aficionados.",
              img:
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: "Pork Chops",
              desc: "Juicy, thick-cut pork, simply seasoned and roasted.",
              img:
                "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: "Herb Chicken",
              desc: "Air-chilled chicken breast with aromatic herbs.",
              img:
                "https://images.unsplash.com/photo-1603052876598-0255e7178a0e?auto=format&fit=crop&w=400&q=80",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-white/80 border border-wood shadow-lg flex flex-col items-center px-2 py-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-200"
              style={{
                fontFamily: "'Playfair Display', serif",
                minHeight: 340,
                letterSpacing: ".02em"
              }}
            >
              <img src={item.img} alt={item.name} className="h-36 rounded-md shadow mb-4 object-cover" style={{objectPosition: "center"}} />
              <div>
                <div className="font-semibold text-lg text-burgundy mb-2 uppercase">{item.name}</div>
                <div className="text-wood text-sm mb-3">{item.desc}</div>
              </div>
              <a
                href="/products"
                className="mt-auto border border-burgundy text-burgundy px-5 py-1.5 rounded font-playfair font-semibold text-sm bg-white/80 hover:bg-burgundy hover:text-white transition-all duration-150"
              >
                Order Now
              </a>
            </div>
          ))}
        </div>
      </section>
      <SectionDivider />
      {/* Recipes CTA */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-burgundy font-playfair mb-5 uppercase">Discover Meat Recipes</h2>
        <p className="text-lg mb-7 text-wood/90">Unlock secrets from the chef’s kitchen for your next meal.</p>
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
