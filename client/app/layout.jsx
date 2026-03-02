import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "MarketForge — Premium Multi-Vendor Marketplace",
  description: "Discover curated products from top vendors. Shop with confidence on MarketForge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-500 text-stone-100 antialiased">
        <AuthProvider>
          <CartProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1e1e21",
                  color: "#f5f5f4",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "8px",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: { primary: "#c9a96e", secondary: "#1e1e21" },
                },
                error: {
                  iconTheme: { primary: "#ef4444", secondary: "#1e1e21" },
                },
              }}
            />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
