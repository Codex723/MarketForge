"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import VendorLayout from "@/components/vendor/VendorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductForm from "@/components/vendor/ProductForm";
import api from "@/lib/api";

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);

      // Append each image file
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => formData.append("images", file));
      }

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product created successfully!");
      router.push("/vendor/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["vendor", "admin"]}>
      <VendorLayout>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-stone-100">Add New Product</h2>
            <p className="text-stone-500 text-sm mt-1">Fill in the details below to list a new product</p>
          </div>
          <div className="bg-surface-300 border border-white/5 rounded-xl p-6">
            <ProductForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </VendorLayout>
    </ProtectedRoute>
  );
}
