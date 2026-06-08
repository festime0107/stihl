import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      ok: true,
      database: "connected",
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        database: "not connected",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
