"use client";

import { Container } from "@mui/material";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";

export default function ProductsSection({ products, loading, activeCategory, setActiveCategory, search, setSearch, onDetails, onAddToCart }) {
  return (
    <Container id="products" maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <ProductFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} search={search} setSearch={setSearch} />
      <ProductGrid products={products} loading={loading} onDetails={onDetails} onAddToCart={onAddToCart} />
    </Container>
  );
}
