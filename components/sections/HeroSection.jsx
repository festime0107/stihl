"use client";

import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { scrollToId } from "@/lib/scroll";

export default function HeroSection({ mode = "client", onOpenAdmin }) {
  return (
    <Box id="home" sx={{ background: "linear-gradient(120deg, #111 0%, #1c1c1c 50%, #f58220 50%, #f58220 100%)", color: "#fff" }}>
      <Container maxWidth="lg" sx={{ minHeight: { xs: 560, md: 660 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr .9fr" }, alignItems: "center", gap: 4, py: 6 }}>
        <Box>
          <Chip label="Katalog + Databazë + WhatsApp" sx={{ bgcolor: "#f58220", color: "#111", fontWeight: 900, mb: 2 }} />
          <Typography component="h1" sx={{ fontSize: { xs: 40, md: 74 }, lineHeight: 0.95, fontWeight: 900, maxWidth: 760 }}>
            Website real për produkte STIHL
          </Typography>
          <Typography sx={{ mt: 3, maxWidth: 590, color: "#ddd", fontSize: 18 }}>
            Klienti zgjedh produktet, i shton në shportë dhe porosia ruhet në databazë + dërgohet në WhatsApp.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
            <Button onClick={() => scrollToId("products")} variant="contained" size="large" sx={{ bgcolor: "#f58220", color: "#111", fontWeight: 900, px: 4, "&:hover": { bgcolor: "#ff9a2f" } }}>
              Shiko Produktet
            </Button>
            {mode === "admin" && (
              <Button onClick={onOpenAdmin} variant="outlined" size="large" sx={{ color: "#fff", borderColor: "#fff", fontWeight: 900, px: 4, "&:hover": { borderColor: "#f58220", color: "#f58220" } }}>
                Hape Admin Panel
              </Button>
            )}
          </Stack>
        </Box>

        <Box sx={{ bgcolor: "#fff", borderRadius: 5, p: { xs: 2, md: 4 }, boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}>
          <Box component="img" src="/images/chainsaw.svg" alt="STIHL Product" sx={{ width: "100%", height: { xs: 250, md: 360 }, objectFit: "contain" }} />
        </Box>
      </Container>
    </Box>
  );
}
