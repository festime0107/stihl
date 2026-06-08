"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { businessConfig } from "@/lib/config";
import { contactWhatsappLink } from "@/lib/whatsapp";

export default function ContactSection() {
  return (
    <Box id="contact" sx={{ bgcolor: "#f58220", py: 7 }}>
      <Container maxWidth="lg" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4, alignItems: "center" }}>
        <Box>
          <Typography sx={{ fontSize: { xs: 34, md: 48 }, fontWeight: 900 }}>Gati për porosi?</Typography>
          <Typography sx={{ fontSize: 18, mt: 1 }}>Klienti mund të shikojë produktet, të shtojë në shportë dhe të dërgojë porosinë në WhatsApp.</Typography>
        </Box>
        <Box sx={{ bgcolor: "#111", color: "#fff", borderRadius: 4, p: 3 }}>
          <Typography sx={{ fontWeight: 900, fontSize: 24 }}>Kontakt</Typography>
          <Typography sx={{ mt: 1, color: "#ccc" }}>Tel: {businessConfig.phone}</Typography>
          <Typography sx={{ color: "#ccc" }}>Adresa: {businessConfig.address}</Typography>
          <Button fullWidth href={contactWhatsappLink()} target="_blank" variant="contained" sx={{ mt: 3, bgcolor: "#25D366", fontWeight: 900, "&:hover": { bgcolor: "#1ebe5d" } }}>💬 Kontakto në WhatsApp</Button>
        </Box>
      </Container>
    </Box>
  );
}
