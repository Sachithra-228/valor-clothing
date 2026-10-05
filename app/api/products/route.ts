import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getProducts());
  } catch {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
