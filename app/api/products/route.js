import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Product from "@/models/Product";
import { defaultProducts } from "@/data/products";

export async function GET() {
  await connectDB();

  let products = await Product.find({ isActive: true }).sort({ createdAt: -1 });

  // Nëse databaza është bosh, krijojmë disa produkte fillestare automatikisht.
  if (products.length === 0) {
    await Product.insertMany(defaultProducts);
    products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
  }

  return NextResponse.json({ products });
}

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  await connectDB();
  const body = await request.json();

  const product = await Product.create(body);
  return NextResponse.json({ product }, { status: 201 });
}
