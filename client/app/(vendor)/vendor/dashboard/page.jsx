"use client";

import { useEffect, useState } from "react";
import VendorLayout from "@/components/vendor/VendorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function StatCard({ label, value, note, accent }) {
  return (
    <div className={`bg-surface-300 rounded-2xl border ${accent ? "border-gold-600/20" : "border-white/5"} p-5`}>
      <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-bold ${accent ? "text-gold-400" : "text-stone-100"}`}>{value}</p>
      {note && <p className="text-stone-600 text-xs mt-1">{note}</p>}
    </div>
  );
}

export default function VendorDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/products/stats");
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["vendor", "admin"]}>
      <VendorLayout>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-xs text-stone-600 font-medium uppercase tracking-wide mb-1">Vendor Console</p>
            <h1 className="font-display text-3xl font-semibold text-stone-100">
              {user?.storeName || "Your Store"}
            </h1>
            <p className="text-stone-500 text-sm mt-1">Here's what's happening in your store</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 gap-4 mb-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface-300 rounded-2xl h-28 border border-white/5" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <StatCard label="Total Products" value={stats?.stats.totalProducts ?? 0} accent />
                <StatCard label="Active Listings" value={stats?.stats.activeProducts ?? 0} note="Currently visible in shop" />
                <StatCard label="Out of Stock" value={stats?.stats.outOfStock ?? 0} note="Need restocking" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-stone-100 font-semibold">Recent products</h2>
                  <Link href="/vendor/products/new" className="btn-gold px-4 py-2 rounded-xl text-xs">
                    + Add product
                  </Link>
                </div>

                {!stats?.recentProducts?.length ? (
                  <div className="bg-surface-300 rounded-2xl border border-white/5 p-14 text-center">
                    <div className="w-12 h-12 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-stone-400 text-sm mb-1">No products yet</p>
                    <p className="text-stone-600 text-xs mb-4">Start selling by adding your first product</p>
                    <Link href="/vendor/products/new" className="btn-gold px-5 py-2 rounded-xl text-sm inline-block">
                      Add your first product
                    </Link>
                  </div>
                ) : (
                  <div className="bg-surface-300 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Product</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Price</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Stock</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Status</th>
                          <th className="px-5 py-3.5" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {stats.recentProducts.map((p) => (
                          <tr key={p._id} className="hover:bg-surface-200/50 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg overflow-hidden bg-surface-200 flex-shrink-0">
                                  {p.images?.[0] ? (
                                    <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <span className="text-stone-200 font-medium truncate max-w-[180px]">{p.title}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-stone-300">
                              ₦{p.price.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`text-sm tabular-nums ${p.stock === 0 ? "text-red-400" : p.stock <= 5 ? "text-amber-400" : "text-stone-300"}`}>
                                {p.stock}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${p.isActive ? "bg-green-900/20 text-green-400 border-green-700/30" : "bg-surface-200 text-stone-500 border-white/5"}`}>
                                {p.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <Link href={`/vendor/products/edit/${p._id}`} className="text-gold-500 hover:text-gold-300 text-xs transition-colors">
                                Edit →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </VendorLayout>
    </ProtectedRoute>
  );
}
