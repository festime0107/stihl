"use client";

import { Box, Button, Container, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { formatPrice } from "@/lib/formatters";
import { cartWhatsappLink } from "@/lib/whatsapp";

export default function CartSection({ cart, cartTotal, changeQuantity, removeFromCart, clearCart }) {
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [savingOrder, setSavingOrder] = useState(false);

  async function submitOrder() {
    if (!customer.name || !customer.phone) {
      alert("Plotëso emrin dhe telefonin.");
      return;
    }

    setSavingOrder(true);

    const payload = {
      customer,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setSavingOrder(false);

    if (data.order?._id) {
      window.open(cartWhatsappLink(cart, customer, data.order._id), "_blank");
      clearCart();
    } else {
      alert("Porosia nuk u ruajt. Provo përsëri.");
    }
  }

  return (
    <Container id="cart" maxWidth="lg" sx={{ py: 7 }}>
      <Box sx={{ bgcolor: "#fff", borderRadius: 4, p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 34, fontWeight: 900 }}>Shporta</Typography>
            <Typography sx={{ color: "#666", mt: 1 }}>Porosia ruhet në databazë dhe pastaj hapet WhatsApp.</Typography>
          </Box>
          <Typography sx={{ fontSize: 28, fontWeight: 900, color: "#f58220" }}>{formatPrice(cartTotal)}</Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {cart.length === 0 ? (
          <Typography>Ende nuk ke shtuar produkte.</Typography>
        ) : (
          <Stack spacing={2}>
            {cart.map((item) => (
              <Stack key={item._id} direction={{ xs: "column", md: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, border: "1px solid #eee", borderRadius: 2, p: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 900 }}>{item.name}</Typography>
                  <Typography>{formatPrice(item.price)} / copë</Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Button variant="outlined" onClick={() => changeQuantity(item._id, "minus")}>-</Button>
                  <Typography sx={{ fontWeight: 900 }}>{item.quantity}</Typography>
                  <Button variant="outlined" onClick={() => changeQuantity(item._id, "plus")}>+</Button>
                  <IconButton onClick={() => removeFromCart(item._id)} color="error">🗑️</IconButton>
                </Stack>
              </Stack>
            ))}

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2, mt: 2 }}>
              <TextField label="Emri i klientit" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              <TextField label="Telefoni" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              <TextField label="Adresa" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
            </Box>

            <Button onClick={submitOrder} disabled={savingOrder} variant="contained" sx={{ bgcolor: "#25D366", fontWeight: 900, py: 1.4, "&:hover": { bgcolor: "#1ebe5d" } }}>
              {savingOrder ? "Po ruhet porosia..." : "💬 Ruaj porosinë dhe dërgo në WhatsApp"}
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
}
