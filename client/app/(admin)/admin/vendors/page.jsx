"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminVendorsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/users")
      .then(({ data }) => setUsers(data.users.filter((u) => u.role === "vendor")))
      .finally(() => setLoading(false));
  }, []);

  const toggleApproval = async (id, current) => {
    try {
      await api.put(`/admin/vendors/${id}`, { isApproved: !current });
      setUsers((prev) => prev.map((u) => u._id === id ? { ...u, isApproved: !current } : u));
      toast.success(`Vendor ${!current ? "approved" : "suspended"}`);
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-stone-100">Vendor Management</h2>
            <p className="text-stone-500 text-sm mt-1">{users.length} vendors</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-surface-300 border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-stone-500 text-left">
                    <th className="px-4 py-3 font-medium">Vendor</th>
                    <th className="px-4 py-3 font-medium">Store</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b border-white/5 last:border-0 hover:bg-surface-200/40">
                      <td className="px-4 py-3 text-stone-100 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-stone-300">{u.storeName}</td>
                      <td className="px-4 py-3 text-stone-400">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.isApproved ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>
                          {u.isApproved ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleApproval(u._id, u.isApproved)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${u.isApproved ? "bg-red-900/40 text-red-400 hover:bg-red-900" : "bg-green-900/40 text-green-400 hover:bg-green-900"}`}
                        >
                          {u.isApproved ? "Suspend" : "Approve"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
