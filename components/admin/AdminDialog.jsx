"use client";

import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import AdminProductForm from "@/components/admin/AdminProductForm";
import AdminProductList from "@/components/admin/AdminProductList";
import OrdersPanel from "@/components/admin/OrdersPanel";
import DashboardStats from "@/components/admin/DashboardStats";
import LowStockPanel from "@/components/admin/LowStockPanel";
import { useOrdersApi } from "@/hooks/useOrdersApi";

const emptyForm = {
  name: "",
  category: "Motorsharra",
  price: "",
  oldPrice: "",
  image: "/images/chainsaw.svg",
  badge: "New",
  power: "",
  warranty: "12 muaj",
  stock: "",
  description: "",
};

export default function AdminDialog({
  open,
  onClose,
  products,
  addProduct,
  updateProduct,
  deleteProduct,
}) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const {
    orders,
    loadingOrders,
    updateOrderStatus,
  } = useOrdersApi(open);

  async function handleSubmit(event) {
    event.preventDefault();

    const productToSave = {
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || form.price),
      stock: Number(form.stock || 0),
      isActive: true,
    };

    if (editingId) {
      await updateProduct(editingId, productToSave);
    } else {
      await addProduct(productToSave);
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(product) {
    setEditingId(product._id);
    setForm({
      ...product,
      price: String(product.price),
      oldPrice: String(product.oldPrice),
      stock: String(product.stock),
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 900, fontSize: 28 }}>
            Admin Panel
          </Typography>
          <Typography sx={{ color: "#666", fontSize: 14 }}>
            Produkte, porosi, status porosish, stok i ulët dhe faturë.
          </Typography>
        </Box>

        <IconButton onClick={onClose}>✕</IconButton>
      </DialogTitle>

      <DialogContent>
        <DashboardStats products={products} orders={orders} />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "380px 1fr" }, gap: 3, pb: 2 }}>
          <AdminProductForm
            form={form}
            setForm={setForm}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
          />

          <AdminProductList
            products={products}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />
        </Box>

        <LowStockPanel products={products} />

        <OrdersPanel
          orders={orders}
          loading={loadingOrders}
          onStatusChange={updateOrderStatus}
        />
      </DialogContent>
    </Dialog>
  );
}
