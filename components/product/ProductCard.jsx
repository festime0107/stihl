"use client";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { formatPrice } from "@/lib/formatters";

export default function ProductCard({ product, onDetails, onAddToCart }) {
  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: 4, overflow: "hidden", border: "1px solid #e5e5e5", transition: ".25s", display: "flex", flexDirection: "column", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 18px 40px rgba(0,0,0,.14)" } }}>
      <Box sx={{ bgcolor: "#f2f2f2", p: 3, position: "relative" }}>
        <Chip label={product.badge} sx={{ position: "absolute", top: 16, left: 16, bgcolor: "#f58220", color: "#111", fontWeight: 900 }} />
        <Box component="img" src={product.image} alt={product.name} sx={{ width: "100%", height: 230, objectFit: "contain" }} />
      </Box>

      <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ color: "#f58220", fontWeight: 900 }}>{product.category}</Typography>
        <Typography sx={{ fontSize: 24, fontWeight: 900 }}>{product.name}</Typography>
        <Typography sx={{ color: "#666", mt: 1, minHeight: 48 }}>{product.description}</Typography>

        <Stack direction="row" spacing={1.5} sx={{ mt: 2, alignItems: "center" }}>
          <Typography sx={{ fontSize: 23, fontWeight: 900 }}>{formatPrice(product.price)}</Typography>
          <Typography sx={{ color: "#999", textDecoration: "line-through" }}>{formatPrice(product.oldPrice)}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip label={`Stok: ${product.stock}`} size="small" />
          <Chip label={product.warranty} size="small" />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mt: 3 }}>
          <Button fullWidth onClick={() => onDetails(product)} variant="contained" sx={{ bgcolor: "#111", fontWeight: 900, "&:hover": { bgcolor: "#f58220", color: "#111" } }}>Detaje</Button>
          <Button fullWidth onClick={() => onAddToCart(product)} variant="outlined" sx={{ color: "#111", borderColor: "#111", fontWeight: 900 }}>Shto në shportë</Button>
        </Stack>
      </Box>
    </Box>
  );
}
