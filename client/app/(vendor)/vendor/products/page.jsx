"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import VendorLayout from "@/components/vendor/VendorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/my?page=${p}&limit=10`);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts(page);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["vendor", "admin"]}>
      <VendorLayout>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-stone-100">My Products</h2>
              <p className="text-stone-500 text-sm mt-1">{pagination.total || 0} total products</p>
            </div>
            <Link
              href="/vendor/products/new"
              className="bg-gold-600 hover:bg-gold-500 text-stone-100 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              + Add Product
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="bg-surface-300 border border-white/5 rounded-xl p-16 text-center">
              <p className="text-stone-500 text-lg">No products yet</p>
              <Link href="/vendor/products/new" className="text-gold-400 text-sm hover:underline mt-2 block">
                Add your first product →
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-surface-300 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-stone-500 text-left">
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">Category</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className="border-b border-white/5 last:border-0 hover:bg-surface-200/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {p.images?.[0] && (
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-200 flex-shrink-0">
                                <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <span className="text-stone-100 font-medium truncate max-w-[180px]">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-stone-400 capitalize">{p.category}</td>
                        <td className="px-4 py-3 text-stone-300">₦{p.price.toLocaleString("en-NG", { minimumFractionDigits: 0 })}</td>
                        <td className="px-4 py-3">
                          <span className={p.stock === 0 ? "text-gold-400" : "text-stone-300"}>{p.stock}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.isActive ? "bg-green-900/40 text-green-400" : "bg-surface-200 text-stone-500"}`}>
                            {p.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/vendor/products/edit/${p._id}`}
                              className="text-xs text-blue-400 hover:underline"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="text-xs text-gold-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-gold-600 text-stone-100"
                          : "bg-surface-200 text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </VendorLayout>
    </ProtectedRoute>
  );
}