"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

const StatCard = ({ label, value, sub }) => (
  <div className="bg-surface-300 border border-white/5 rounded-xl p-5">
    <p className="text-stone-400 text-sm">{label}</p>
    <p className="text-3xl font-black text-stone-100 mt-1">{value}</p>
    {sub && <p className="text-xs text-stone-500 mt-1">{sub}</p>}
  </div>
);

const STATUS_COLORS = {
  paid: "text-blue-400", processing: "text-yellow-400",
  shipped: "text-purple-400", delivered: "text-green-400",
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats").then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-stone-100">Admin Dashboard</h2>
            <p className="text-stone-500 text-sm mt-1">Platform overview</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <StatCard label="Total Revenue" value={`₦${data?.stats.totalRevenue?.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`} />
                <StatCard label="Total Orders" value={data?.stats.totalOrders} />
                <StatCard label="Total Products" value={data?.stats.totalProducts} />
                <StatCard label="Customers" value={data?.stats.totalUsers} />
                <StatCard label="Vendors" value={data?.stats.totalVendors} sub={`${data?.stats.pendingVendors} pending approval`} />
              </div>

              <h3 className="text-lg font-bold text-stone-100 mb-4">Recent Orders</h3>
              <div className="bg-surface-300 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-stone-500 text-left">
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.recentOrders.map((o) => (
                      <tr key={o._id} className="border-b border-white/5 last:border-0 hover:bg-surface-200/40">
                        <td className="px-4 py-3 text-stone-100">{o.customer?.name}</td>
                        <td className="px-4 py-3 text-stone-300">₦{o.totalAmount?.toLocaleString("en-NG", { minimumFractionDigits: 0 })}</td>
                        <td className={`px-4 py-3 capitalize font-medium ${STATUS_COLORS[o.status] || "text-stone-400"}`}>{o.status}</td>
                        <td className="px-4 py-3 text-stone-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}