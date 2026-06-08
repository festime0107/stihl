"use client";

import { Box, Stack, Typography } from "@mui/material";

export default function LowStockPanel({ products }) {
  const lowStockProducts = products.filter((product) => Number(product.stock || 0) < 5);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ fontWeight: 900, fontSize: 24, mb: 2 }}>
        ⚠️ Produkte me stok të ulët
      </Typography>

      {lowStockProducts.length === 0 ? (
        <Box sx={{ bgcolor: "#e8f5e9", borderRadius: 3, p: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>
            Nuk ka produkte me stok të ulët.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {lowStockProducts.map((product) => (
            <Box
              key={product._id}
              sx={{
                bgcolor: "#fff8e1",
                border: "1px solid #ffe082",
                borderRadius: 3,
                p: 2,
              }}
            >
              <Typography sx={{ fontWeight: 900 }}>
                {product.name}
              </Typography>
              <Typography sx={{ color: "#795548" }}>
                Stok aktual: {product.stock} copë
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
