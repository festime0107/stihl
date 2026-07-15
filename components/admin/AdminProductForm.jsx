"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import ProductImageUploader from "@/components/admin/ProductImageUploader";

// Forma e adminit për shtim dhe editim produkti.
// Fotoja mund të zgjidhet nga galeria ose të vendoset manualisht si URL.
export default function AdminProductForm({
  form,
  setForm,
  editingId,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ bgcolor: "#f7f7f7", p: 3, borderRadius: 3 }}
    >
      <Typography sx={{ fontWeight: 900, fontSize: 22, mb: 2 }}>
        {editingId ? "Edito produktin" : "Shto produkt"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          required
          label="Emri"
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
        />

        <TextField
          label="Kategoria"
          value={form.category}
          onChange={(event) =>
            setForm({ ...form, category: event.target.value })
          }
          helperText="Shembull: Motorsharra, Trimmera..."
        />

        <TextField
          required
          label="Çmimi"
          type="number"
          value={form.price}
          onChange={(event) =>
            setForm({ ...form, price: event.target.value })
          }
        />

        <TextField
          label="Çmimi i vjetër"
          type="number"
          value={form.oldPrice}
          onChange={(event) =>
            setForm({ ...form, oldPrice: event.target.value })
          }
        />

        <ProductImageUploader
          imageUrl={form.image}
          onUploaded={(secureUrl) =>
            setForm({ ...form, image: secureUrl })
          }
        />

        <TextField
          label="URL e fotos"
          value={form.image}
          onChange={(event) =>
            setForm({ ...form, image: event.target.value })
          }
          helperText="Plotësohet automatikisht pas upload-it. Mund të vendosësh edhe URL manualisht."
        />

        <TextField
          label="Etiketa"
          value={form.badge}
          onChange={(event) =>
            setForm({ ...form, badge: event.target.value })
          }
        />

        <TextField
          label="Fuqia"
          value={form.power}
          onChange={(event) =>
            setForm({ ...form, power: event.target.value })
          }
        />

        <TextField
          label="Garancia"
          value={form.warranty}
          onChange={(event) =>
            setForm({ ...form, warranty: event.target.value })
          }
        />

        <TextField
          label="Stoku"
          type="number"
          value={form.stock}
          onChange={(event) =>
            setForm({ ...form, stock: event.target.value })
          }
        />

        <TextField
          multiline
          minRows={3}
          label="Përshkrimi"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!form.image}
          sx={{ bgcolor: "#111", fontWeight: 900 }}
        >
          {editingId ? "Ruaj ndryshimet" : "Shto produktin"}
        </Button>

        {!form.image && (
          <Typography color="error" sx={{ fontSize: 13 }}>
            Ngarko ose vendos një foto para se të ruash produktin.
          </Typography>
        )}

        {editingId && (
          <Button
            type="button"
            variant="outlined"
            onClick={onCancelEdit}
          >
            Anulo editimin
          </Button>
        )}
      </Stack>
    </Box>
  );
}
