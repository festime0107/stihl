"use client";

import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0b0b0b", color: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontWeight: 900, fontSize: 24 }}>STIHL<span style={{ color: "#f58220" }}>STORE</span></Typography>
        <Typography sx={{ color: "#aaa", mt: 1 }}>Katalog real me MongoDB, admin login dhe porosi në WhatsApp.</Typography>
      </Container>
    </Box>
  );
}
