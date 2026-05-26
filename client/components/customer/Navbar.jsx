"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("See you soon.");
    router.push("/login");
  };

  const navLinks = [
    { href: "/shop", label: "Shop" },
    ...(user?.role === "vendor" ? [{ href: "/vendor/dashboard", label: "Dashboard" }] : []),
    ...(user?.role === "admin" ? [{ href: "/admin/dashboard", label: "Admin" }] : []),
    ...(user?.role === "customer" ? [{ href: "/orders", label: "My Orders" }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-400/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/shop" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
              <span className="text-xs font-black text-surface-500">M</span>
            </div>
            <span className="font-display text-base font-semibold text-stone-100 tracking-wide">
              Market<span className="text-gradient">Forge</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-gold-400"
                    : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-stone-400 hover:text-stone-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-gold-500 text-surface-500 text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-300">
                  <div className="w-5 h-5 rounded-full bg-gold-600 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-surface-500">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-stone-300 font-medium">{user.name?.split(" ")[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-stone-500 hover:text-stone-200 transition-colors px-3 py-1.5"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="text-sm text-stone-400 hover:text-stone-100 px-3 py-1.5 transition-colors">
                  Sign in
                </Link>
                <Link href="/register" className="text-sm btn-gold px-4 py-1.5 rounded-lg">
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-stone-100"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-400/98 backdrop-blur-xl border-t border-white/5 px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium py-2.5 transition-colors ${
                  pathname === link.href ? "text-gold-400" : "text-stone-300 hover:text-stone-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/5 mt-2 pt-3">
              {user ? (
                <button onClick={handleLogout} className="text-sm text-stone-400 hover:text-stone-100 py-2">
                  Sign out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-stone-300 py-2">Sign in</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="text-sm btn-gold px-4 py-2 rounded-lg text-center">Get started</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
