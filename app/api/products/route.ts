import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { parseProductInput } from "@/lib/product-input";
import { createProduct, DuplicateSlugError, getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getProducts());
  } catch {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const parsed = parseProductInput(await request.json().catch(() => null));
  if ("errors" in parsed) return NextResponse.json({ error: "Please fix the highlighted fields.", errors: parsed.errors }, { status: 400 });

  try {
    return NextResponse.json(await createProduct(parsed.data), { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateSlugError) {
      return NextResponse.json({ error: "Please fix the highlighted fields.", errors: { name: "A product with this name already exists." } }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}
