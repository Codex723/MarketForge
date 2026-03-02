"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import VendorLayout from "@/components/vendor/VendorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductForm from "@/components/vendor/ProductForm";
import api from "@/lib/api";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch {
        toast.error("Product not found");
        router.push("/vendor/products");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("isActive", data.isActive);

      if (data.images && data.images.length > 0 && data.images[0] instanceof File) {
        Array.from(data.images).forEach((file) => formData.append("images", file));
      }

      await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated!");
      router.push("/vendor/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["vendor", "admin"]}>
      <VendorLayout>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-stone-100">Edit Product</h2>
            <p className="text-stone-500 text-sm mt-1">Update your product details</p>
          </div>

          {fetching ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-surface-300 border border-white/5 rounded-xl p-6">
              <ProductForm
                defaultValues={product}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          )}
        </div>
      </VendorLayout>
    </ProtectedRoute>
  );
}
