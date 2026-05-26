"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register: registerUser, getDashboardPath } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await registerUser({ ...data, role });
      toast.success("Account created. Welcome to MarketForge.");
      router.push(getDashboardPath(user.role));
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-500 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/shop" className="flex items-center gap-2 mb-10">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
            <span className="text-xs font-black text-surface-500">M</span>
          </div>
          <span className="font-display text-base font-semibold text-stone-100">
            Market<span className="text-gradient">Forge</span>
          </span>
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-stone-100 mb-2">Create account</h1>
          <p className="text-stone-400 text-sm">Join thousands of shoppers and sellers</p>
        </div>

        {/* Role Selector */}
        <div className="flex p-1 bg-surface-200 rounded-xl border border-white/5 mb-6">
          {[
            { id: "customer", label: "Shop", icon: "🛍" },
            { id: "vendor", label: "Sell", icon: "🏪" },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === r.id
                  ? "bg-surface-400 text-stone-100 shadow-sm border border-white/8"
                  : "text-stone-500 hover:text-stone-300"
              }`}
            >
              <span>{r.icon}</span>
              {r.label} on MarketForge
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">Full name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">Email address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          {role === "vendor" && (
            <div className="border-t border-white/5 pt-4 space-y-4">
              <p className="text-xs text-stone-500 uppercase tracking-wide font-medium">Store details</p>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">Store name</label>
                <input
                  {...register("storeName", { required: role === "vendor" ? "Store name is required" : false })}
                  placeholder="e.g. Lagos Craft Co."
                  className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600"
                />
                {errors.storeName && <p className="text-red-400 text-xs mt-1.5">{errors.storeName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">Store description <span className="text-stone-600">(optional)</span></label>
                <textarea
                  {...register("storeDescription")}
                  placeholder="Tell customers what makes your store special..."
                  rows={3}
                  className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600 resize-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 rounded-xl text-sm mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-surface-500 border-t-transparent rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              `Create ${role === "vendor" ? "vendor" : ""} account`
            )}
          </button>
        </form>

        <p className="text-stone-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
