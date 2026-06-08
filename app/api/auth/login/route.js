import { NextResponse } from "next/server";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ message: "Email ose password gabim" }, { status: 401 });
  }

  const token = createToken({ email, role: "admin" });
  await setAuthCookie(token);

  return NextResponse.json({ ok: true, admin: { email } });
}
