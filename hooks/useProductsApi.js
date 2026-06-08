"use client";

import { useEffect, useMemo, useState } from "react";

export function useProductsApi() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  async function fetchProducts() {
    try {
      setLoadingProducts(true);
      const response = await fetch("/api/products", { cache: "no-store" });

      if (!response.ok) {
        console.error("Products API error:", response.status);
        setProducts([]);
        return;
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Products fetch error:", error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function addProduct(product) {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      alert("Produkti nuk u shtua. Kontrollo login-in ose databazën.");
      return;
    }

    await fetchProducts();
  }

  async function updateProduct(productId, product) {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      alert("Produkti nuk u përditësua.");
      return;
    }

    await fetchProducts();
  }

  async function deleteProduct(productId) {
    const confirmed = window.confirm("A je e sigurt që do ta fshish këtë produkt?");
    if (!confirmed) return;

    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Produkti nuk u fshi.");
      return;
    }

    await fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loadingProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}

export function useFilteredProducts(products, activeCategory, search) {
  return useMemo(() => {
    return products.filter((product) => {
      const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesCategory =
        activeCategory === "Të gjitha" || product.category === activeCategory;
      const matchesSearch = text.includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);
}
