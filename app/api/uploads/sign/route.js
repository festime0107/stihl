import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Upload route po funksionon.",
  });
}

export async function POST() {
  const auth = await requireAdmin();

  if (auth.error) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        message:
          "Konfigurimi i Cloudinary mungon. Kontrollo CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY dhe CLOUDINARY_API_SECRET.",
      },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "stihl-store/products";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    apiSecret
  );

  return NextResponse.json({
    timestamp,
    folder,
    signature,
    cloudName,
    apiKey,
  });
}