"use client";

import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { formatPrice } from "@/lib/formatters";

const statusLabels = {
  new: "E re",
  confirmed: "E konfirmuar",
  completed: "E përfunduar",
  cancelled: "E anuluar",
};

export default function OrdersPanel({ orders, loading, onStatusChange }) {
  function printInvoice(order) {
    const items = order.items
      .map(
        (item) =>
          `<tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${formatPrice(item.price * item.quantity)}</td>
          </tr>`
      )
      .join("");

    const html = `
      <html>
        <head>
          <title>Faturë - ${order._id}</title>
          <style>
            body { font-family: Arial; padding: 32px; }
            h1 { margin-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background: #f58220; color: #111; }
            .total { margin-top: 24px; font-size: 22px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>STIHL Store</h1>
          <p><b>Kodi i porosisë:</b> ${order._id}</p>
          <p><b>Klienti:</b> ${order.customer?.name || "-"}</p>
          <p><b>Telefoni:</b> ${order.customer?.phone || "-"}</p>
          <p><b>Adresa:</b> ${order.customer?.address || "-"}</p>
          <p><b>Statusi:</b> ${statusLabels[order.status] || order.status}</p>
          <table>
            <thead>
              <tr>
                <th>Produkti</th>
                <th>Sasia</th>
                <th>Çmimi</th>
                <th>Totali</th>
              </tr>
            </thead>
            <tbody>${items}</tbody>
          </table>
          <div class="total">Totali: ${formatPrice(order.total)}</div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, mb: 2, gap: 2 }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: 24 }}>
          Porositë
        </Typography>

        <Button href="/api/orders/export" target="_blank" variant="contained" sx={{ bgcolor: "#111" }}>
          Export CSV
        </Button>
      </Stack>

      {loading ? (
        <Typography>Po ngarkohen porositë...</Typography>
      ) : orders.length === 0 ? (
        <Typography>Nuk ka ende porosi.</Typography>
      ) : (
        <Stack spacing={1.5}>
          {orders.map((order) => (
            <Box key={order._id} sx={{ bgcolor: "#fff", border: "1px solid #eee", borderRadius: 3, p: 2 }}>
              <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-between", gap: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 900 }}>
                    {order.customer?.name} · {order.customer?.phone}
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    {order.customer?.address}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    Totali: <b>{formatPrice(order.total)}</b>
                  </Typography>
                  <Typography sx={{ color: "#666", mt: 1 }}>
                    {order.items.map((i) => `${i.name} x ${i.quantity}`).join(" | ")}
                  </Typography>
                </Box>

                <Stack spacing={1} sx={{ minWidth: { xs: "100%", md: 220 } }}>
                  <TextField
                    select
                    label="Statusi"
                    value={order.status || "new"}
                    onChange={(event) => onStatusChange(order._id, event.target.value)}
                    size="small"
                  >
                    <MenuItem value="new">E re</MenuItem>
                    <MenuItem value="confirmed">E konfirmuar</MenuItem>
                    <MenuItem value="completed">E përfunduar</MenuItem>
                    <MenuItem value="cancelled">E anuluar</MenuItem>
                  </TextField>

                  <Button onClick={() => printInvoice(order)} variant="outlined" sx={{ fontWeight: 900 }}>
                    🧾 Printo faturë
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
