
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsyncAction } from "@/redux/productsSlice";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { setCategory } from "@/redux/filterSlice";
import type { RootState } from "@/redux";
import { useI18n } from "@/i18n";

const CATEGORIES = [
  "Beef",
  "Chicken",
  "Frozen",
  "Badatz",
  "Rubin",
  "Other Hechsherim",
];

const Products = () => {
  const { t, lang } = useI18n();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const selectedCategory = useSelector((state: RootState) => state.filter.category);

  useEffect(() => {
    dispatch(fetchDataAsyncAction() as any);
  }, [dispatch]);

  // Handler for category selection
  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value === "All" || value === "הכל" ? null : value));
  };

  // Filtering logic
  const filteredItems = selectedCategory
    ? items.filter((product: any) => {
        const prodCat = (product.category || "").toLowerCase();
        const selCat = (selectedCategory || "").toLowerCase();
        return prodCat === selCat;
      })
    : items;

  return (
    <main className="container py-12 min-h-[70vh] animate-fade-in" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-8 text-burgundy font-playfair drop-shadow">
        {t("allProducts")}
      </h1>

      {/* Category Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="w-full max-w-xs">
          <label className="block text-sm font-semibold text-burgundy mb-2 font-playfair">{t("filterCategory")}</label>
          <Select
            value={selectedCategory ?? "All"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("filterCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">{t("All", "categories")}</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{t(cat, "categories")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading && <div>{t("loading")}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((product: any) => (
          <div
            key={product.id}
            className="bg-card border border-wood rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-6 animate-fade-in"
            style={{ fontFamily: `'Playfair Display', serif` }}
          >
            <h2 className="text-xl font-bold text-burgundy mb-2">{product.name}</h2>
            <p className="text-lg font-playfair text-wood font-bold mb-2">
              {typeof product.price === "number"
                ? `$${product.price.toFixed(2)}`
                : lang === "he" ? "לא זמין" : "Not available"}
            </p>
            {/* Show category if exists */}
            {product.category && (
              <p className="mb-2 text-xs uppercase tracking-wide text-burgundy/60 font-semibold">{t(product.category, "categories")}</p>
            )}
            <Link
              to={`/products/${product.id}`}
              className="inline-block bg-burgundy text-white font-semibold font-playfair px-6 py-2 mt-2 rounded shadow hover:bg-black hover:text-wood transition-all duration-200 hover:scale-105"
            >
              {t("viewDetails")}
            </Link>
          </div>
        ))}
      </div>
      {/* Show a message if no products match */}
      {!loading && filteredItems.length === 0 && (
        <div className="mt-12 text-center text-lg text-wood/90 font-playfair">{t("noProducts")}</div>
      )}
    </main>
  );
};

export default Products;

