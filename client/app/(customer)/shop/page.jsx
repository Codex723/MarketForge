"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/customer/Navbar";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";
import toast from "react-hot-toast";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
  { id: "home", label: "Home" },
  { id: "beauty", label: "Beauty" },
  { id: "sports", label: "Sports" },
  { id: "food", label: "Food" },
  { id: "books", label: "Books" },
  { id: "other", label: "Other" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
];

function StarRating({ rating, size = "sm" }) {
  const filled = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} ${s <= filled ? "text-gold-400" : "text-stone-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-surface-200 rounded-2xl mb-3" />
      <div className="h-3.5 bg-surface-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-surface-200 rounded w-1/2 mb-3" />
      <div className="h-4 bg-surface-200 rounded w-1/3" />
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [addingId, setAddingId] = useState(null);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12, sort });
      if (search) params.append("search", search);
      if (category !== "all") params.append("category", category);
      const { data } = await api.get(`/shop/products?${params}`);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, category, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleAddToCart = async (product) => {
    setAddingId(product._id);
    addToCart(product);
    toast.success("Added to bag");
    setTimeout(() => setAddingId(null), 800);
  };

  return (
    <div className="min-h-screen bg-surface-500">
      <Navbar />

      {/* Hero section */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-gold-500 uppercase tracking-widest mb-2">MarketForge Store</p>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-stone-100 leading-tight">
                Curated for you
              </h1>
              <p className="text-stone-400 text-sm mt-2">
                {pagination.total ? `${pagination.total.toLocaleString()} products` : "Loading..."}
              </p>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full lg:w-auto lg:min-w-[360px]">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, brands..."
                  className="w-full bg-surface-200 text-stone-100 rounded-xl pl-10 pr-4 py-2.5 text-sm border border-white/6 focus:outline-none focus:border-gold-500/40 transition-all placeholder:text-stone-600"
                />
              </div>
              <button type="submit" className="btn-gold px-5 py-2.5 rounded-xl text-sm">
                Search
              </button>
            </form>
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
            {/* Categories */}
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setCategory(cat.id); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    category === cat.id
                      ? "bg-gold-600 text-surface-500 shadow-sm"
                      : "bg-surface-200 text-stone-400 hover:text-stone-200 hover:bg-surface-100 border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="bg-surface-200 text-stone-300 rounded-xl px-3.5 py-1.5 text-xs border border-white/6 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-stone-400 text-sm">No products found</p>
            <button onClick={() => { setCategory("all"); setSearch(""); setPage(1); fetchProducts(); }} className="text-gold-400 text-xs mt-2 hover:text-gold-300">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <div
                key={p._id}
                className="group bg-surface-300 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
              >
                <Link href={`/product/${p._id}`} className="block">
                  <div className="aspect-[4/5] bg-surface-200 overflow-hidden relative">
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0].url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {p.stock === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-xs font-medium text-stone-300 bg-surface-400/80 px-3 py-1 rounded-full">
                          Sold out
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-medium text-stone-300 bg-surface-500/80 backdrop-blur px-2 py-0.5 rounded-full capitalize">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-3.5">
                  <Link href={`/product/${p._id}`}>
                    <h3 className="text-stone-100 text-sm font-semibold leading-snug truncate hover:text-gold-400 transition-colors mb-0.5">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-stone-500 text-xs truncate mb-2">{p.vendor?.storeName}</p>

                  <div className="flex items-center gap-1.5 mb-3">
                    <StarRating rating={p.ratings?.average || 0} />
                    <span className="text-stone-600 text-xs">({p.ratings?.count || 0})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-100 font-bold text-sm">
                      ₦{p.price.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
                    </span>
                    {p.stock > 0 && (
                      <button
                        onClick={() => handleAddToCart(p)}
                        disabled={addingId === p._id}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                          addingId === p._id
                            ? "bg-gold-600 text-surface-500"
                            : "bg-surface-100 text-stone-300 hover:bg-gold-600 hover:text-surface-500 border border-white/8"
                        }`}
                      >
                        {addingId === p._id ? "Added ✓" : "Add to bag"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl bg-surface-200 text-stone-400 hover:text-stone-100 disabled:opacity-30 text-sm border border-white/5 transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pagination.pages || Math.abs(p - page) <= 2)
              .map((p, idx, arr) => (
                <span key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="text-stone-600 px-1 text-sm">...</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      p === page
                        ? "bg-gold-600 text-surface-500 shadow-sm"
                        : "bg-surface-200 text-stone-400 hover:text-stone-100 border border-white/5"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
              disabled={page === pagination.pages}
              className="w-9 h-9 rounded-xl bg-surface-200 text-stone-400 hover:text-stone-100 disabled:opacity-30 text-sm border border-white/5 transition-colors"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
