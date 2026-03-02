"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const register = async (formData) => {
    const { data } = await api.post("/auth/register", formData);
    Cookies.set("accessToken", data.accessToken, { expires: 1 / 96 }); // 15 min
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    Cookies.set("accessToken", data.accessToken, { expires: 1 / 96 });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    Cookies.remove("accessToken");
    setUser(null);
  };

  // Redirect based on role
  const getDashboardPath = (role) => {
    if (role === "admin") return "/admin";
    if (role === "admin") return "/admin/dashboard";
    return "/shop";
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, getDashboardPath }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
