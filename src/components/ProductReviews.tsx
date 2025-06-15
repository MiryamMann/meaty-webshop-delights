
import React, { useEffect, useState } from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

const getReviewsKey = (productId: string) => `reviews_${productId}`;

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const all = localStorage.getItem(getReviewsKey(productId));
    setReviews(all ? JSON.parse(all) : []);
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRating = (r: number) => setForm((f) => ({ ...f, rating: r }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    const newReview = { ...form, date: new Date().toISOString() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(getReviewsKey(productId), JSON.stringify(updated));
    setForm({ name: "", rating: 5, comment: "" });
  };

  return (
    <section className="my-8 border-t border-wood pt-6">
      <h2 className="text-lg font-bold mb-4 text-burgundy">Customer Reviews</h2>
      {reviews.length === 0 && <div className="mb-4 text-wood">No reviews yet. Be the first!</div>}
      <ul className="mb-6 space-y-4">
        {reviews.map((r, i) => (
          <li key={i} className="rounded-md bg-card px-4 py-3 border border-wood">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <span>{r.name}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) =>
                  <span key={idx} className={idx < +r.rating ? "text-yellow-400" : "text-gray-400"}>★</span>
                )}
              </span>
              <span className="text-xs ml-auto text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
            </div>
            <div>{r.comment}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="bg-secondary/50 rounded-lg p-4 space-y-3">
        <div>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="px-3 py-2 border rounded w-full bg-background"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Rating:</span>
          {Array.from({ length: 5 }).map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleRating(idx + 1)}
              className={form.rating >= idx + 1 ? "text-yellow-400" : "text-gray-400"}
              aria-label={`${idx + 1} Star${idx > 0 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
        <div>
          <textarea
            name="comment"
            required
            rows={3}
            placeholder="Write your review"
            className="px-3 py-2 border rounded w-full bg-background resize-none"
            value={form.comment}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-burgundy text-white rounded px-4 py-2 hover:bg-black transition"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default ProductReviews;
