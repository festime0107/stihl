"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function AdminProductForm({ form, setForm, editingId, onSubmit, onCancelEdit }) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ bgcolor: "#f7f7f7", p: 3, borderRadius: 3 }}>
      <Typography sx={{ fontWeight: 900, fontSize: 22, mb: 2 }}>{editingId ? "Edito produktin" : "Shto produkt"}</Typography>
      <Stack spacing={2}>
        <TextField required label="Emri" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField label="Kategoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <TextField required label="Çmimi" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <TextField label="Çmimi i vjetër" type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
        <TextField label="Foto URL/path" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} helperText="Mund të jetë /images/chainsaw.svg ose URL fotoje" />
        <TextField label="Etiketa" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
        <TextField label="Fuqia" value={form.power} onChange={(e) => setForm({ ...form, power: e.target.value })} />
        <TextField label="Garancia" value={form.warranty} onChange={(e) => setForm({ ...form, warranty: e.target.value })} />
        <TextField label="Stoku" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <TextField multiline minRows={3} label="Përshkrimi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button type="submit" variant="contained" sx={{ bgcolor: "#111", fontWeight: 900 }}>{editingId ? "Ruaj ndryshimet" : "Shto produktin"}</Button>
        {editingId && <Button variant="outlined" onClick={onCancelEdit}>Anulo editimin</Button>}
      </Stack>
    </Box>
  );
}
