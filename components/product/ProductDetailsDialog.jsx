"use client";

import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";
import { formatPrice } from "@/lib/formatters";
import { productWhatsappLink } from "@/lib/whatsapp";

export default function ProductDetailsDialog({ product, onClose, onAddToCart }) {
  return (
    <Dialog open={Boolean(product)} onClose={onClose} fullWidth maxWidth="md">
      {product && (
        <>
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Typography sx={{ fontWeight: 900, fontSize: 26 }}>{product.name}</Typography>
            <IconButton onClick={onClose}>✕</IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, pb: 2 }}>
              <Box sx={{ bgcolor: "#f3f3f3", borderRadius: 3, p: 3 }}>
                <Box component="img" src={product.image} alt={product.name} sx={{ width: "100%", height: 280, objectFit: "contain" }} />
              </Box>
              <Box>
                <Chip label={product.category} sx={{ bgcolor: "#fff1e5", color: "#c45f00", fontWeight: 900 }} />
                <Typography sx={{ mt: 2, color: "#555" }}>{product.description}</Typography>
                <Stack direction="row" spacing={1.5} sx={{ mt: 2, alignItems: "center" }}>
                  <Typography sx={{ fontSize: 28, fontWeight: 900 }}>{formatPrice(product.price)}</Typography>
                  <Typography sx={{ color: "#999", textDecoration: "line-through" }}>{formatPrice(product.oldPrice)}</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography><b>Fuqia:</b> {product.power}</Typography>
                <Typography><b>Garancia:</b> {product.warranty}</Typography>
                <Typography><b>Stoku:</b> {product.stock} copë</Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
                  <Button fullWidth onClick={() => onAddToCart(product)} variant="contained" sx={{ bgcolor: "#111", fontWeight: 900 }}>Shto në shportë</Button>
                  <Button fullWidth href={productWhatsappLink(product)} target="_blank" variant="contained" sx={{ bgcolor: "#25D366", fontWeight: 900 }}>💬 Porosit WhatsApp</Button>
                </Stack>
              </Box>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
