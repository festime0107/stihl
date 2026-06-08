"use client";

import { Box, Typography } from "@mui/material";
import { formatPrice } from "@/lib/formatters";

export default function DashboardStats({ products, orders }) {
  const activeProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const lowStockProducts = products.filter((product) => Number(product.stock || 0) < 5);

  const cards = [
    { title: "Produkte aktive", value: activeProducts, subtitle: "Produkte në katalog" },
    { title: "Porosi", value: totalOrders, subtitle: "Porosi të ruajtura" },
    { title: "Xhiro totale", value: formatPrice(totalRevenue), subtitle: "Nga porositë" },
    { title: "Stok i ulët", value: lowStockProducts.length, subtitle: "Produkte me stok < 5" },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ fontWeight: 900, fontSize: 26, mb: 2 }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <Box
            key={card.title}
            sx={{
              bgcolor: "#111",
              color: "#fff",
              borderRadius: 3,
              p: 2.5,
              borderBottom: "5px solid #f58220",
            }}
          >
            <Typography sx={{ color: "#ccc", fontSize: 14 }}>
              {card.title}
            </Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 28, mt: 0.5 }}>
              {card.value}
            </Typography>
            <Typography sx={{ color: "#aaa", fontSize: 13, mt: 0.5 }}>
              {card.subtitle}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
