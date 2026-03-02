"use client";

import Navbar from "@/components/customer/Navbar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useState } from "react";
import DeliveryWizard from "@/components/customer/DeliveryWizard";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const handleCheckoutClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setShowWizard(true);
  };

  const handleDeliveryComplete = async (deliveryInfo) => {
    setShowWizard(false);
    setLoading(true);
    try {
      const { data } = await api.post("/orders/checkout", {
        items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: {
          fullName: user.name,
          address: deliveryInfo.fullAddress,
          city: deliveryInfo.city,
          state: deliveryInfo.area,
          country: "Nigeria",
          zip: "",
          junction: deliveryInfo.junction,
          deliveryDate: deliveryInfo.deliveryDate,
        },
      });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-500">
      <Navbar />

      {showWizard && (
        <DeliveryWizard
          onComplete={handleDeliveryComplete}
          onCancel={() => setShowWizard(false)}
        />
      )}

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-semibold text-stone-100">Your bag</h1>
          <p className="text-stone-500 text-sm mt-1">
            {cart.length === 0 ? "Nothing here yet" : `${cart.length} item${cart.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-stone-400 text-base mb-1">Your bag is empty</p>
            <p className="text-stone-600 text-sm mb-6">Discover something you'll love</p>
            <Link href="/shop" className="btn-gold px-6 py-2.5 rounded-xl text-sm inline-block">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 bg-surface-300 rounded-2xl p-4 border border-white/5"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-200 flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.productId}`}>
                      <p className="text-stone-100 text-sm font-semibold truncate hover:text-gold-400 transition-colors">
                        {item.title}
                      </p>
                    </Link>
                    <p className="text-stone-500 text-xs mt-0.5">
                      ₦{item.price.toLocaleString("en-NG", { minimumFractionDigits: 0 })} each
                    </p>

                    <div className="flex items-center gap-3 mt-2.5">
                      <div className="flex items-center gap-1 bg-surface-200 rounded-lg border border-white/6 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-400 hover:text-stone-100 text-sm transition-colors"
                        >
                          −
                        </button>
                        <span className="px-2 text-stone-200 text-sm w-6 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, Math.min(item.stock || 99, item.quantity + 1))}
                          className="px-2.5 py-1 text-stone-400 hover:text-stone-100 text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-stone-100 font-semibold text-sm">
                        ₦{(item.price * item.quantity).toLocaleString("en-NG", { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1.5 text-stone-600 hover:text-red-400 transition-colors ml-1 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-stone-600 hover:text-red-400 transition-colors pt-1"
              >
                Clear all items
              </button>
            </div>

            {/* Summary */}
            <div className="h-fit">
              <div className="bg-surface-300 rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5">
                  <h2 className="text-stone-100 font-semibold">Order summary</h2>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400">Subtotal ({cart.length} items)</span>
                    <span className="text-stone-200">
                      ₦{totalPrice.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400">Delivery</span>
                    <span className="text-stone-400 text-xs">At checkout</span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between">
                    <span className="text-stone-100 font-semibold">Total</span>
                    <span className="text-gold-400 font-bold text-lg">
                      ₦{totalPrice.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <button
                    onClick={handleCheckoutClick}
                    disabled={loading}
                    className="w-full btn-gold py-3 rounded-xl text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-surface-500 border-t-transparent rounded-full animate-spin" />
                        Redirecting to payment...
                      </span>
                    ) : (
                      "Checkout with Paystack"
                    )}
                  </button>
                  <p className="text-center text-stone-600 text-xs mt-3 flex items-center justify-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secured by Paystack
                  </p>
                </div>
              </div>

              <Link href="/shop" className="block text-center text-stone-500 hover:text-stone-300 text-xs mt-4 transition-colors">
                ← Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}