"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CartSection from "@/components/cart/CartSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import ProductDetailsDialog from "@/components/product/ProductDetailsDialog";
import AdminDialog from "@/components/admin/AdminDialog";
import AdminLogin from "@/components/admin/AdminLogin";
import { useCart } from "@/hooks/useCart";
import { useFilteredProducts, useProductsApi } from "@/hooks/useProductsApi";

export default function AppShell({ mode = "client" }) {
  const [activeCategory, setActiveCategory] = useState("Të gjitha");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(mode === "admin");

  const { products, loadingProducts, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductsApi();
  const { cart, cartTotal, addToCart, changeQuantity, removeFromCart, clearCart } = useCart();
  const filteredProducts = useFilteredProducts(products, activeCategory, search);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      if (mode !== "admin") return;
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      setAdmin(data.admin);
      setCheckingAuth(false);
      if (data.admin) setAdminOpen(true);
    }

    checkAuth();
  }, [mode]);

  if (!mounted) return null;

  if (mode === "admin" && checkingAuth) {
    return null;
  }

  if (mode === "admin" && !admin) {
    return <AdminLogin onLoggedIn={() => { setAdmin({ role: "admin" }); setAdminOpen(true); }} />;
  }

  return (
    <>
      <Navbar mode={mode} cartCount={cart.length} onOpenAdmin={() => setAdminOpen(true)} />

      <HeroSection mode={mode} onOpenAdmin={() => setAdminOpen(true)} />

      <ProductsSection
        products={filteredProducts}
        loading={loadingProducts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
        onDetails={setSelectedProduct}
        onAddToCart={addToCart}
      />

      <ServicesSection />

      <CartSection
        cart={cart}
        cartTotal={cartTotal}
        changeQuantity={changeQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      <ContactSection />

      <Footer />

      <ProductDetailsDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />

      {mode === "admin" && (
        <AdminDialog
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </>
  );
}
