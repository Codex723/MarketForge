"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/customer/Navbar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

function StarRating({ rating, interactive = false, onRate }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => interactive && onRate && onRate(s)}
          className={`transition-colors ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          <svg
            className={`${interactive ? "w-6 h-6" : "w-4 h-4"} ${s <= Math.round(rating) ? "text-gold-400" : "text-stone-700"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "", orderId: "" });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [pRes, rRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/reviews/${id}`),
        ]);
        setProduct(pRes.data.product);
        setReviews(rRes.data.reviews);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    toast.success(`${qty} item${qty > 1 ? "s" : ""} added to bag`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/reviews", { productId: id, ...reviewForm });
      toast.success("Review submitted. Thank you!");
      const { data } = await api.get(`/reviews/${id}`);
      setReviews(data.reviews);
      setReviewForm({ rating: 5, comment: "", orderId: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-500">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="aspect-square bg-surface-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-5 bg-surface-200 rounded w-1/4" />
              <div className="h-8 bg-surface-200 rounded w-3/4" />
              <div className="h-4 bg-surface-200 rounded w-1/2" />
              <div className="h-10 bg-surface-200 rounded w-1/3 mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-500">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-stone-400 mb-4">Product not found</p>
            <Link href="/shop" className="text-gold-400 text-sm hover:text-gold-300">← Back to shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-500">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/shop" className="hover:text-gold-400 transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-stone-400 truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-surface-200 rounded-2xl overflow-hidden mb-3 border border-white/5">
              {product.images?.[activeImage]?.url ? (
                <img
                  src={product.images[activeImage].url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImage ? "border-gold-500" : "border-white/5 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-stone-400 capitalize bg-surface-200 px-3 py-1 rounded-full border border-white/5">
                {product.category}
              </span>
              {product.stock > 0 && product.stock <= 5 && (
                <span className="text-xs font-medium text-amber-400 bg-amber-900/20 px-3 py-1 rounded-full border border-amber-700/20">
                  Only {product.stock} left
                </span>
              )}
              {product.stock === 0 && (
                <span className="text-xs font-medium text-red-400 bg-red-900/20 px-3 py-1 rounded-full border border-red-700/20">
                  Sold out
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-semibold text-stone-100 leading-tight mb-2">
              {product.title}
            </h1>

            <p className="text-stone-500 text-sm mb-3">
              by{" "}
              <span className="text-stone-300 font-medium">{product.vendor?.storeName}</span>
            </p>

            <div className="flex items-center gap-2 mb-5">
              <StarRating rating={product.ratings?.average || 0} />
              <span className="text-stone-400 text-sm">
                {product.ratings?.average?.toFixed(1) || "0.0"}
              </span>
              <span className="text-stone-600 text-sm">
                ({product.ratings?.count || 0} review{product.ratings?.count !== 1 ? "s" : ""})
              </span>
            </div>

            <div className="mb-5">
              <span className="font-display text-4xl font-semibold text-gradient">
                ₦{product.price.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed mb-7">{product.description}</p>

            {product.stock > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-surface-200 rounded-xl border border-white/6 overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-2.5 text-stone-400 hover:text-stone-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-stone-100 text-sm tabular-nums">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="px-4 py-2.5 text-stone-400 hover:text-stone-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-stone-600 text-xs">{product.stock} available</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    added
                      ? "bg-green-800/40 text-green-300 border border-green-700/30"
                      : "btn-gold"
                  }`}
                >
                  {added ? "Added to bag ✓" : "Add to bag"}
                </button>
              </div>
            )}

            {/* Trust signals */}
            <div className="flex items-center gap-5 mt-6 pt-6 border-t border-white/5">
              {[
                { icon: "🔒", label: "Secure payment" },
                { icon: "📦", label: "Fast delivery" },
                { icon: "↩️", label: "Easy returns" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-stone-500 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="border-t border-white/5 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-semibold text-stone-100">
              Reviews
              <span className="text-stone-500 font-sans text-lg font-normal ml-2">({reviews.length})</span>
            </h2>
          </div>

          {user?.role === "customer" && (
            <div className="bg-surface-300 rounded-2xl border border-white/5 p-6 mb-8">
              <h3 className="text-stone-100 font-semibold mb-4">Write a review</h3>
              <form onSubmit={handleReview} className="space-y-4">
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Your rating</p>
                  <StarRating
                    rating={reviewForm.rating}
                    interactive
                    onRate={(r) => setReviewForm({ ...reviewForm, rating: r })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1.5 uppercase tracking-wide">Order ID</label>
                  <input
                    value={reviewForm.orderId}
                    onChange={(e) => setReviewForm({ ...reviewForm, orderId: e.target.value })}
                    placeholder="Find this in your orders page"
                    required
                    className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-2.5 text-sm border border-white/6 focus:outline-none focus:border-gold-500/40 transition-all placeholder:text-stone-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1.5 uppercase tracking-wide">Your experience</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="What did you think of the product?"
                    rows={3}
                    required
                    className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-2.5 text-sm border border-white/6 focus:outline-none focus:border-gold-500/40 transition-all placeholder:text-stone-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold px-6 py-2.5 rounded-xl text-sm"
                >
                  {submitting ? "Submitting..." : "Submit review"}
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-500 text-sm">No reviews yet. Be the first to share your experience.</p>
              </div>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="bg-surface-300 rounded-2xl border border-white/5 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gold-900/40 border border-gold-700/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 text-sm font-bold">
                        {r.customer?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-stone-200 text-sm font-medium">{r.customer?.name}</p>
                        <span className="text-stone-600 text-xs">
                          {new Date(r.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed pl-12">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
