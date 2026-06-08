"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { categories } from "@/data/products";

export default function ProductFilters({ activeCategory, setActiveCategory, search, setSearch }) {
  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4, justifyContent: "space-between", alignItems: { xs: "stretch", md: "flex-end" } }}>
        <Box>
          <Typography sx={{ color: "#f58220", fontWeight: 900 }}>PRODUKTET</Typography>
          <Typography component="h2" sx={{ fontSize: { xs: 34, md: 48 }, fontWeight: 900 }}>Katalogu</Typography>
        </Box>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔎 Kërko produkt..." sx={{ width: { xs: "100%", md: 320 }, bgcolor: "#fff" }} />
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap sx={{ mb: 4, flexWrap: "wrap" }}>
        {categories.map((category) => (
          <Button key={category} onClick={() => setActiveCategory(category)} variant={activeCategory === category ? "contained" : "outlined"} sx={{ borderRadius: 100, fontWeight: 900, bgcolor: activeCategory === category ? "#111" : "#fff", color: activeCategory === category ? "#fff" : "#111", borderColor: "#ddd", "&:hover": { bgcolor: activeCategory === category ? "#111" : "#fff1e5", borderColor: "#f58220" } }}>
            {category}
          </Button>
        ))}
      </Stack>
    </>
  );
}
