"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, getDashboardPath } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}.`);
      router.push(getDashboardPath(user.role));
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-500 flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-300 via-surface-400 to-surface-500" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(201,169,110,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(160,120,64,0.3) 0%, transparent 50%)" }} />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/shop" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
              <span className="text-sm font-black text-surface-500">M</span>
            </div>
            <span className="font-display text-lg font-semibold text-stone-100">
              Market<span className="text-gradient">Forge</span>
            </span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-semibold text-stone-100 leading-tight mb-4">
              A marketplace built<br />for those who demand<br />
              <span className="text-gradient">the finest.</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Discover curated products from premium vendors, delivered with care and precision.
            </p>
          </div>
          <div className="flex gap-6">
            {["10K+ Products", "500+ Vendors", "Trusted Payments"].map((t) => (
              <div key={t} className="text-xs text-stone-500 font-medium tracking-wide uppercase">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/shop" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
              <span className="text-xs font-black text-surface-500">M</span>
            </div>
            <span className="font-display text-base font-semibold text-stone-100">
              Market<span className="text-gradient">Forge</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-stone-100 mb-2">Welcome back</h1>
            <p className="text-stone-400 text-sm">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-200 text-stone-100 rounded-xl px-4 py-3 text-sm border border-white/6 focus:outline-none focus:border-gold-500/50 focus:bg-surface-100 transition-all placeholder:text-stone-600"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 rounded-xl text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-surface-500 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-stone-500 text-sm text-center mt-6">
            New to MarketForge?{" "}
            <Link href="/register" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
