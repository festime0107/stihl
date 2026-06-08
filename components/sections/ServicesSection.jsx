"use client";

import { Box, Container, Typography } from "@mui/material";

export default function ServicesSection() {
  const services = [
    { icon: "🚚", title: "Dorëzim", text: "Dorëzim në qytet dhe rrethina sipas porosisë." },
    { icon: "✅", title: "Garanci", text: "Produkte me garanci dhe informacion teknik." },
    { icon: "☎️", title: "Asistencë", text: "Klienti mund të kontaktojë direkt në WhatsApp." },
  ];

  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", py: 7 }}>
      <Container maxWidth="lg" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
        {services.map((item) => (
          <Box key={item.title} sx={{ borderLeft: "5px solid #f58220", pl: 2 }}>
            <Box sx={{ color: "#f58220", fontSize: 28 }}>{item.icon}</Box>
            <Typography sx={{ fontSize: 24, fontWeight: 900 }}>{item.title}</Typography>
            <Typography sx={{ color: "#ccc", mt: 1 }}>{item.text}</Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
