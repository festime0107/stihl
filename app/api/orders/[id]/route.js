import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Order from "@/models/Order";

export async function PUT(request, { params }) {
  const auth = await requireAdmin();
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  await connectDB();

  const body = await request.json();
  const allowedStatuses = ["new", "confirmed", "completed", "cancelled"];

  if (!allowedStatuses.includes(body.status)) {
    return NextResponse.json({ message: "Status i pavlefshëm" }, { status: 400 });
  }

  const order = await Order.findByIdAndUpdate(
    params.id,
    { status: body.status },
    { new: true }
  );

  return NextResponse.json({ order });
}
