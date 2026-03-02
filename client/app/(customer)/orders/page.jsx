"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/customer/Navbar";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

const STATUS_STYLES = {
  pending: "bg-stone-800 text-stone-400 border-stone-700/30",
  paid: "bg-blue-900/30 text-blue-300 border-blue-700/30",
  processing: "bg-amber-900/30 text-amber-300 border-amber-700/30",
  shipped: "bg-purple-900/30 text-purple-300 border-purple-700/30",
  delivered: "bg-green-900/30 text-green-300 border-green-700/30",
  cancelled: "bg-red-900/30 text-red-300 border-red-700/30",
};

const STATUS_LABELS = {
  pending: "Pending",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data.orders);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-surface-500">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-semibold text-stone-100">My orders</h1>
          <p className="text-stone-500 text-sm mt-1">Track and manage your purchases</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-surface-300 rounded-2xl h-28 border border-white/5" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-stone-400 text-sm mb-1">No orders yet</p>
            <p className="text-stone-600 text-xs mb-6">Your purchase history will appear here</p>
            <Link href="/shop" className="btn-gold px-6 py-2.5 rounded-xl text-sm inline-block">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-surface-300 rounded-2xl border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <div>
                    <p className="text-stone-200 text-sm font-semibold">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-stone-500 text-xs mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[order.status] || STATUS_STYLES.pending}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                    <span className="text-gold-400 font-bold text-sm">
                      ₦{order.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="flex gap-3 overflow-x-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 flex-shrink-0 bg-surface-200 rounded-xl px-3 py-2 border border-white/5">
                        {item.image && (
                          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="text-stone-200 text-xs font-medium max-w-[140px] truncate">{item.title}</p>
                          <p className="text-stone-500 text-xs">×{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.shippingAddress?.address && (
                    <p className="text-stone-600 text-xs mt-3">
                      Delivering to: {order.shippingAddress.fullName}, {order.shippingAddress.city}, {order.shippingAddress.country}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
