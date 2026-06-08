import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Product from "@/models/Product";

export async function PUT(request, { params }) {
  const auth = await requireAdmin();
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  await connectDB();
  const body = await request.json();

  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json({ product });
}

export async function DELETE(request, { params }) {
  const auth = await requireAdmin();
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  await connectDB();

  // Nuk e fshijmë fizikisht; vetëm e fshehim nga klienti.
  await Product.findByIdAndUpdate(params.id, { isActive: false });
  return NextResponse.json({ ok: true });
}
