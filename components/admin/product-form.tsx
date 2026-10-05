"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { ArrowLeft, ArrowRight, ImagePlus, X } from "lucide-react";
import { useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import type { Product } from "@/types/product";
import { slugify, type ProductInputErrors } from "@/lib/product-input";
import { cn } from "@/lib/utils";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const inputClass = "h-11 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-white/40";

function Field({ label, hint, error, className, children }: { label: string; hint?: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("grid content-start gap-2", className)}>
      <span className="text-xs uppercase tracking-[.16em] text-white/55">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-white/35">{hint}</span>}
      {error && <span role="alert" className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

function toList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

type ProductFormProps = { product?: Product; categories: string[]; collections: string[]; uploadsEnabled: boolean };

export function ProductForm({ product, categories, collections, uploadsEnabled }: ProductFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<ProductInputErrors>({});
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function addFiles(files: File[]) {
    setMessage("");
    if (!uploadsEnabled) return;
    const rejected = files.filter((file) => !IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES);
    if (rejected.length) setMessage(`Skipped ${rejected.map((file) => file.name).join(", ")}: images must be JPG, PNG, WebP or AVIF and under 10 MB.`);

    const accepted = files.filter((file) => !rejected.includes(file));
    setUploading((count) => count + accepted.length);
    for (const file of accepted) {
      const dot = file.name.lastIndexOf(".");
      const pathname = `products/${slugify(file.name.slice(0, dot)) || "image"}${file.name.slice(dot).toLowerCase()}`;
      try {
        const blob = await upload(pathname, file, { access: "public", handleUploadUrl: "/api/admin/upload" });
        setImages((current) => [...current, blob.url]);
        setErrors((current) => ({ ...current, images: undefined }));
      } catch (error) {
        setMessage(`Could not upload ${file.name}. ${error instanceof Error ? error.message : ""} Check that you are still signed in and that image storage is connected.`);
      }
      setUploading((count) => count - 1);
    }
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles([...event.dataTransfer.files]);
  }

  function moveImage(index: number, offset: number) {
    setImages((current) => {
      const next = [...current];
      [next[index], next[index + offset]] = [next[index + offset], next[index]];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrors({});
    setPending(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      description: form.get("description"),
      price: form.get("price"),
      salePrice: form.get("salePrice"),
      stock: form.get("stock"),
      category: form.get("category"),
      collection: form.get("collection"),
      badge: form.get("badge"),
      gender: form.get("gender"),
      sizes: toList(String(form.get("sizes"))),
      colors: toList(String(form.get("colors"))),
      images
    };

    try {
      const response = await fetch(product ? `/api/products/${product.slug}` : "/api/products", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      if (response.status === 401) return router.replace("/admin/login");
      const body = await response.json().catch(() => null);
      setErrors(body?.errors ?? {});
      setMessage(body?.error ?? "Could not save the product.");
    } catch {
      setMessage("Could not reach the server. Your changes are not saved yet.");
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="grid content-start gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} hint={product ? undefined : "The product link is created from the name and stays the same afterwards."} className="sm:col-span-2">
          <input name="name" defaultValue={product?.name} className={inputClass} />
        </Field>
        <Field label="Description" error={errors.description} className="sm:col-span-2">
          <textarea name="description" defaultValue={product?.description} rows={4} className={cn(inputClass, "h-auto py-3 leading-6")} />
        </Field>
        <Field label="Price (USD)" error={errors.price}>
          <input name="price" type="number" min="0" step="0.01" defaultValue={product?.price} className={inputClass} />
        </Field>
        <Field label="Sale price (optional)" error={errors.salePrice} hint="Shown instead of the price, with the price crossed out.">
          <input name="salePrice" type="number" min="0" step="0.01" defaultValue={product?.salePrice} className={inputClass} />
        </Field>
        <Field label="Stock" error={errors.stock} hint="0 marks the product as out of stock.">
          <input name="stock" type="number" min="0" step="1" defaultValue={product?.stock ?? 0} className={inputClass} />
        </Field>
        <Field label="Badge" error={errors.badge}>
          <select name="badge" defaultValue={product?.badge ?? ""} className={inputClass}>
            <option value="">None</option>
            <option>New</option>
            <option>Limited</option>
            <option>Sale</option>
          </select>
        </Field>
        <Field label="Category" error={errors.category} hint="Pick an existing one or type a new one.">
          <input name="category" list="product-categories" defaultValue={product?.category} className={inputClass} />
          <datalist id="product-categories">{categories.map((item) => <option key={item} value={item} />)}</datalist>
        </Field>
        <Field label="Collection" error={errors.collection} hint="Pick an existing one or type a new one.">
          <input name="collection" list="product-collections" defaultValue={product?.collection} className={inputClass} />
          <datalist id="product-collections">{collections.map((item) => <option key={item} value={item} />)}</datalist>
        </Field>
        <Field label="Sizes" error={errors.sizes} hint="Separate with commas.">
          <input name="sizes" defaultValue={(product?.sizes ?? ["S", "M", "L", "XL"]).join(", ")} className={inputClass} />
        </Field>
        <Field label="Colours" error={errors.colors} hint="Separate with commas.">
          <input name="colors" defaultValue={product?.colors.join(", ")} placeholder="Black, White" className={inputClass} />
        </Field>
        <Field label="For" error={errors.gender}>
          <select name="gender" defaultValue={product?.gender ?? "Unisex"} className={inputClass}>
            <option>Unisex</option>
            <option>Men</option>
            <option>Women</option>
          </select>
        </Field>
      </div>

      <div className="grid content-start gap-4">
        <div>
          <p className="text-xs uppercase tracking-[.16em] text-white/55">Images</p>
          <p className="mt-2 text-xs text-white/35">The first image is shown on product cards; the second appears on hover.</p>
        </div>

        {images.length > 0 && (
          <ul className="grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <li key={image} className="relative aspect-[4/5] overflow-hidden rounded-md bg-white/5">
                <Image src={image} alt={`Product image ${index + 1}`} fill sizes="190px" className="object-cover" />
                {index === 0 && <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.14em] text-black">Main</span>}
                <div className="absolute inset-x-2 bottom-2 flex justify-between">
                  <div className="flex gap-1">
                    <button type="button" aria-label="Move earlier" disabled={index === 0} onClick={() => moveImage(index, -1)} className="rounded-full bg-black/70 p-1.5 disabled:opacity-30">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" aria-label="Move later" disabled={index === images.length - 1} onClick={() => moveImage(index, 1)} className="rounded-full bg-black/70 p-1.5 disabled:opacity-30">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button type="button" aria-label="Remove image" onClick={() => setImages((current) => current.filter((item) => item !== image))} className="rounded-full bg-black/70 p-1.5">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!uploadsEnabled && (
          <p role="alert" className="rounded-md border border-amber-400/40 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
            Image uploads are switched off because image storage is not connected. Create a Blob store for this project in Vercel, add BLOB_READ_WRITE_TOKEN to the environment, then restart or redeploy.
          </p>
        )}
        <label
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn("flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-8 text-center text-sm text-white/60 transition hover:border-white/45", dragging && "border-white bg-white/5", !uploadsEnabled && "pointer-events-none opacity-40")}
        >
          <ImagePlus className="h-5 w-5" />
          {uploading > 0 ? `Uploading ${uploading} image${uploading > 1 ? "s" : ""}…` : "Drop images here or click to choose"}
          <span className="text-xs text-white/35">JPG, PNG, WebP or AVIF, up to 10 MB each</span>
          <input
            type="file"
            accept={IMAGE_TYPES.join(",")}
            multiple
            disabled={!uploadsEnabled}
            className="sr-only"
            onChange={(event) => { addFiles([...(event.target.files ?? [])]); event.target.value = ""; }}
          />
        </label>
        {errors.images && <p role="alert" className="text-xs text-red-400">{errors.images}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 lg:col-span-2">
        <button disabled={pending || uploading > 0} className="h-11 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[.16em] text-black transition hover:bg-silver disabled:opacity-50">
          {pending ? "Saving…" : product ? "Save changes" : "Add product"}
        </button>
        <Link href="/admin" className="text-xs uppercase tracking-[.16em] text-white/55 transition hover:text-white">Cancel</Link>
        {message && <p role="alert" className="text-sm text-red-400">{message}</p>}
      </div>
    </form>
  );
}
