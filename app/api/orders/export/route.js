import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Order from "@/models/Order";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });

  const rows = [
    ["Data", "Emri", "Telefoni", "Adresa", "Totali", "Statusi", "Produktet"],
    ...orders.map((order) => [
      new Date(order.createdAt).toISOString(),
      order.customer?.name || "",
      order.customer?.phone || "",
      order.customer?.address || "",
      order.total || 0,
      order.status || "",
      order.items.map((i) => `${i.name} x ${i.quantity}`).join(" | "),
    ]),
  ];

  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=orders.csv",
    },
  });
}
