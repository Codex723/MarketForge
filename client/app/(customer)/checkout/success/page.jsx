"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/customer/Navbar";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";

const TRACKING_STEPS = [
  {
    id: "confirmed",
    label: "Order Confirmed",
    desc: "Your payment was received",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "processing",
    label: "Processing",
    desc: "Vendor is preparing your order",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "shipped",
    label: "Out for Delivery",
    desc: "Your order is on its way",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    id: "delivered",
    label: "Delivered",
    desc: "Enjoy your purchase!",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const reference = searchParams.get("reference") || searchParams.get("trxref");
      if (!reference) {
        clearCart();
        setStatus("success");
        return;
      }
      try {
        const res = await api.post("/orders/verify", { reference });
        clearCart();
        setOrder(res.data?.order || null);
        setStatus("success");
      } catch {
        setStatus("failed");
      }
    };
    verify();
  }, []);

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-surface-500">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-400 text-sm">Confirming your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-surface-500">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-red-900/30 border border-red-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-semibold text-stone-100 mb-2">Payment not confirmed</h1>
            <p className="text-stone-400 text-sm mb-8">
              We couldn't verify your payment. If money was deducted, please contact support with your payment reference.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/cart" className="bg-surface-200 hover:bg-surface-100 text-stone-200 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors border border-white/8">
                Back to cart
              </Link>
              <Link href="/orders" className="btn-gold px-5 py-2.5 rounded-xl text-sm">
                My orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shipping = order?.shippingAddress || {};
  const deliveryDate = shipping.deliveryDate;
  const junction = shipping.junction;
  const city = shipping.city;

  return (
    <div className="min-h-screen bg-surface-500">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 pt-24 pb-16">

        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gold-900/20 border border-gold-600/30 rounded-full flex items-center justify-center mx-auto mb-5 relative">
            <svg className="w-9 h-9 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded-full border border-gold-500/20 animate-ping opacity-30" />
          </div>
          <p className="text-xs font-medium text-gold-500 uppercase tracking-widest mb-2">Order Confirmed</p>
          <h1 className="font-display text-3xl font-semibold text-stone-100 mb-2">Thank you!</h1>
          <p className="text-stone-400 text-sm">Your payment was successful. Here's what happens next.</p>
        </div>

        {/* Delivery Info Card */}
        {(deliveryDate || junction || city) && (
          <div className="bg-surface-300 rounded-2xl border border-white/6 p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-stone-200 font-semibold text-sm">Delivery Information</p>
            </div>

            <div className="space-y-3">
              {deliveryDate && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-0.5">Estimated Delivery</p>
                    <p className="text-stone-100 font-semibold text-sm">{deliveryDate}</p>
                  </div>
                </div>
              )}

              {junction && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-0.5">Drop-off Junction</p>
                    <p className="text-stone-100 font-semibold text-sm">{junction}</p>
                    {city && <p className="text-stone-500 text-xs">{shipping.state}, {city}</p>}
                  </div>
                </div>
              )}

              {shipping.address && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-0.5">Delivery Address</p>
                    <p className="text-stone-300 text-sm">{shipping.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Jumia-style tracking */}
        <div className="bg-surface-300 rounded-2xl border border-white/6 p-5 mb-5">
          <p className="text-stone-200 font-semibold text-sm mb-5">Order Status</p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-5 bottom-5 w-px bg-surface-200" />
            <div className="absolute left-4 top-5 w-px bg-gold-500/60" style={{ height: "25%" }} />

            <div className="space-y-6">
              {TRACKING_STEPS.map((s, i) => {
                const isActive = i === 0;
                const isDone = false;
                return (
                  <div key={s.id} className="flex items-start gap-4 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${isDone ? "bg-gold-500 text-surface-500" : isActive ? "bg-gold-500/20 border border-gold-500 text-gold-400" : "bg-surface-200 text-stone-600 border border-white/5"}`}>
                      {s.icon}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-semibold ${isActive ? "text-gold-400" : isDone ? "text-stone-200" : "text-stone-600"}`}>
                        {s.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-stone-400" : "text-stone-600"}`}>{s.desc}</p>
                      {isActive && (
                        <span className="inline-block mt-1 text-xs text-gold-500 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-full">
                          Current status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/orders" className="flex-1 btn-gold py-3 rounded-xl text-sm text-center font-semibold">
            Track Order
          </Link>
          <Link href="/shop" className="flex-1 bg-surface-300 hover:bg-surface-200 text-stone-200 text-sm font-medium py-3 rounded-xl text-center transition-colors border border-white/6">
            Shop More
          </Link>
        </div>
      </div>
    </div>
  );
}