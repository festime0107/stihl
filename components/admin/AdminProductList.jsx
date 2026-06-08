"use client";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { formatPrice } from "@/lib/formatters";

export default function AdminProductList({ products, onEdit, onDelete }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 900, fontSize: 22, mb: 2 }}>
        Lista e produkteve
      </Typography>

      <Stack spacing={1.5}>
        {products.map((product) => {
          const isLowStock = Number(product.stock || 0) < 5;

          return (
            <Stack
              key={product._id}
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                border: isLowStock ? "1px solid #ffb300" : "1px solid #eee",
                bgcolor: isLowStock ? "#fff8e1" : "#fff",
                borderRadius: 3,
                p: 2,
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: 76,
                    height: 60,
                    objectFit: "contain",
                    bgcolor: "#f1f1f1",
                    borderRadius: 2,
                  }}
                />

                <Box>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 900 }}>
                      {product.name}
                    </Typography>

                    {isLowStock && (
                      <Chip label="Stok i ulët" size="small" sx={{ bgcolor: "#ffb300", fontWeight: 900 }} />
                    )}
                  </Stack>

                  <Typography sx={{ color: "#666" }}>
                    {product.category} · {formatPrice(product.price)} · Stok {product.stock}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button onClick={() => onEdit(product)} variant="outlined">
                  ✏️ Edito
                </Button>
                <Button onClick={() => onDelete(product._id)} color="error" variant="outlined">
                  🗑️ Fshi
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
