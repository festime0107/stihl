"use client";

import { Box, Typography } from "@mui/material";
import ProductCard from "@/components/product/ProductCard";

export default function ProductGrid({ products, loading, onDetails, onAddToCart }) {
  if (loading) return <Typography>Po ngarkohen produktet...</Typography>;

  if (products.length === 0) {
    return <Box sx={{ bgcolor: "#fff", p: 5, borderRadius: 4, textAlign: "center" }}><Typography sx={{ fontWeight: 900, fontSize: 24 }}>Nuk u gjet asnjë produkt.</Typography></Box>;
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 3 }}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onDetails={onDetails} onAddToCart={onAddToCart} />
      ))}
    </Box>
  );
}
