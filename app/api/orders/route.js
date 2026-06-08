import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Order from "@/models/Order";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  const items = body.items || [];
  const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  const order = await Order.create({
    customer: body.customer,
    items,
    total,
  });

  return NextResponse.json({ order }, { status: 201 });
}
