"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = ["electronics", "fashion", "home", "beauty", "sports", "food", "books", "other"];

export default function ProductForm({ defaultValues = {}, onSubmit, loading }) {
  const [previews, setPreviews] = useState(defaultValues.images?.map((i) => i.url) || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const inputClass =
    "w-full bg-surface-200 text-stone-100 rounded-lg px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 placeholder-gray-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm text-stone-400 mb-1">Product Title *</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="e.g. Wireless Noise-Cancelling Headphones"
          className={inputClass}
        />
        {errors.title && <p className="text-gold-400 text-xs mt-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm text-stone-400 mb-1">Description *</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Describe your product in detail..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.description && <p className="text-gold-400 text-xs mt-1">{errors.description.message}</p>}
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-stone-400 mb-1">Price (₦) *</label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className={inputClass}
          />
          {errors.price && <p className="text-gold-400 text-xs mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-stone-400 mb-1">Stock *</label>
          <input
            {...register("stock", {
              required: "Stock is required",
              min: { value: 0, message: "Stock cannot be negative" },
            })}
            type="number"
            placeholder="0"
            className={inputClass}
          />
          {errors.stock && <p className="text-gold-400 text-xs mt-1">{errors.stock.message}</p>}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm text-stone-400 mb-1">Category *</label>
        <select
          {...register("category", { required: "Category is required" })}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-gold-400 text-xs mt-1">{errors.category.message}</p>}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm text-stone-400 mb-1">
          Product Images * <span className="text-gray-600">(max 5, JPEG/PNG/WebP)</span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleImages}
          {...register("images", { required: !defaultValues._id && "At least one image is required" })}
          className="w-full text-sm text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-red-900 file:text-stone-100 hover:file:bg-red-800 cursor-pointer"
        />
        {errors.images && <p className="text-gold-400 text-xs mt-1">{errors.images.message}</p>}

        {/* Image previews */}
        {previews.length > 0 && (
          <div className="flex gap-3 mt-3 flex-wrap">
            {previews.map((url, i) => (
              <div key={i} className="w-20 h-20 rounded-lg overflow-hidden bg-surface-200 border border-white/6">
                <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active toggle (edit only) */}
      {defaultValues._id && (
        <div className="flex items-center gap-3">
          <input
            {...register("isActive")}
            type="checkbox"
            id="isActive"
            className="w-4 h-4 accent-red-600 cursor-pointer"
          />
          <label htmlFor="isActive" className="text-sm text-stone-400 cursor-pointer">
            Product is active and visible to customers
          </label>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold-600 hover:bg-gold-500 text-stone-100 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : defaultValues._id ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}