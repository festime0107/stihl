"use client";

import { Badge, Box, Button, Container, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { businessConfig } from "@/lib/config";
import { scrollToId } from "@/lib/scroll";

export default function Navbar({ cartCount, mode = "client", onOpenAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Produktet", id: "products" },
    { label: "Shporta", id: "cart" },
    ...(mode === "admin" ? [{ label: "Admin", id: "admin" }] : []),
    { label: "Kontakt", id: "contact" },
  ];

  function handleMenuClick(item) {
    if (item.id === "admin") onOpenAdmin();
    else scrollToId(item.id);
    setMobileOpen(false);
  }

  const navContent = (
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 2 }}>
      {menuItems.map((item) => (
        <Button key={item.id} onClick={() => handleMenuClick(item)} sx={{ color: "#fff", fontWeight: 800, justifyContent: "flex-start", "&:hover": { color: "#f58220" } }}>
          {item.label}
        </Button>
      ))}
    </Stack>
  );

  return (
    <>
      <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 1100, bgcolor: "#111", borderBottom: "5px solid #f58220" }}>
        <Container maxWidth="lg" sx={{ minHeight: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Box onClick={() => scrollToId("home")} sx={{ cursor: "pointer" }}>
            <Typography sx={{ fontSize: { xs: 23, md: 30 }, fontWeight: 900 }}>
              STIHL<span style={{ color: "#f58220" }}>STORE</span>
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#cfcfcf" }}>{businessConfig.subtitle}</Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>{navContent}</Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <IconButton onClick={() => scrollToId("cart")} sx={{ color: "#fff", bgcolor: "rgba(255,255,255,.08)" }}>
              <Badge badgeContent={cartCount} color="warning"><Box component="span" sx={{ fontSize: 22 }}>🛒</Box></Badge>
            </IconButton>

            {mode === "admin" && (
              <Button onClick={onOpenAdmin} variant="contained" sx={{ display: { xs: "none", sm: "inline-flex" }, bgcolor: "#f58220", color: "#111", fontWeight: 900, "&:hover": { bgcolor: "#ff9a2f" } }}>
                ⚙️ Admin
              </Button>
            )}

            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#fff", display: { xs: "inline-flex", md: "none" } }}>☰</IconButton>
          </Stack>
        </Container>
      </Box>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 290, bgcolor: "#111", color: "#fff", height: "100%", p: 3 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography sx={{ fontWeight: 900 }}>MENU</Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#fff" }}>✕</IconButton>
          </Stack>
          {navContent}
        </Box>
      </Drawer>
    </>
  );
}
