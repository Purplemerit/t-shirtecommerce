import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Faxico | Sustainable, High-Quality Fashion",
  description: "Capture your defining moments with Faxico's elegant products.",
};

import { CartProvider } from "@/context/CartContext";
import PromoModal from "@/components/PromoModal";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <AuthProvider>
                  <Navbar />
                  <main style={{ minHeight: '100vh' }}>
                    {children}
                  </main>
                  <Footer />
                  <PromoModal />
                </AuthProvider>
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
