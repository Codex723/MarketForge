"use client";

import { useEffect, useState } from "react";
import VendorLayout from "@/components/vendor/VendorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["processing", "shipped", "delivered"];
const STATUS_COLORS = {
  paid: "text-blue-400 bg-blue-900/30",
  processing: "text-yellow-400 bg-yellow-900/30",
  shipped: "text-purple-400 bg-purple-900/30",
  delivered: "text-green-400 bg-green-900/30",
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/vendor").then(({ data }) => setOrders(data.orders)).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <VendorLayout>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-stone-100">Incoming Orders</h2>
            <p className="text-stone-500 text-sm mt-1">{orders.length} orders</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-surface-300 border border-white/5 rounded-xl p-16 text-center text-stone-500">
              No orders yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-surface-300 border border-white/5 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-stone-500">Order · {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-stone-100 text-sm font-semibold">{order.customer?.name} — {order.customer?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status] || "text-stone-400 bg-surface-200"}`}>
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="bg-surface-200 text-stone-100 text-xs rounded-lg px-3 py-1.5 border border-white/6 focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {order.items.filter((i) => i.vendor?.toString()).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-surface-200 rounded-lg px-3 py-2">
                        {item.image && <img src={item.image} alt={item.title} className="w-8 h-8 rounded object-cover" />}
                        <div>
                          <p className="text-stone-100 text-xs font-medium">{item.title}</p>
                          <p className="text-stone-500 text-xs">x{item.quantity} · ₦{item.price.toLocaleString("en-NG", { minimumFractionDigits: 0 })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-right text-stone-100 font-bold text-sm mt-3">Total: ₦{order.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </VendorLayout>
    </ProtectedRoute>
  );
}