"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const navItems = [
  {
    label: "Dashboard",
    href: "/vendor/dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/vendor/products",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: "Add Product",
    href: "/vendor/products/new",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: "Orders",
    href: "/vendor/orders",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

export default function VendorLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("See you soon.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-surface-500 flex">
      <aside className="w-60 bg-surface-300 border-r border-white/5 flex flex-col fixed h-full">
        <div className="p-5 border-b border-white/5">
          <Link href="/shop" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
              <span className="text-[10px] font-black text-surface-500">M</span>
            </div>
            <span className="font-display text-sm font-semibold text-stone-100">
              Market<span className="text-gradient">Forge</span>
            </span>
          </Link>
          <p className="text-xs text-stone-600 mt-1 ml-8">Vendor Panel</p>
        </div>

        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2.5 bg-surface-200 rounded-xl px-3 py-2.5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold-900/40 border border-gold-700/30 flex items-center justify-center flex-shrink-0">
              <span className="text-gold-400 text-xs font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="text-stone-200 text-xs font-medium truncate">{user?.storeName}</p>
              <p className="text-stone-500 text-[11px] truncate">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? "bg-gold-600/10 text-gold-400 border border-gold-600/20"
                    : "text-stone-400 hover:text-stone-200 hover:bg-surface-200"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-stone-500 hover:text-red-400 hover:bg-red-900/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-60 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
