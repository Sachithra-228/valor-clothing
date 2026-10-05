import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { parseProductInput } from "@/lib/product-input";
import { deleteProduct, getProductBySlug, updateProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Context) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const { slug } = await params;
  const parsed = parseProductInput(await request.json().catch(() => null));
  if ("errors" in parsed) return NextResponse.json({ error: "Please fix the highlighted fields.", errors: parsed.errors }, { status: 400 });

  try {
    const product = await updateProduct(slug, parsed.data);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const { slug } = await params;
  try {
    if (!(await deleteProduct(slug))) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
