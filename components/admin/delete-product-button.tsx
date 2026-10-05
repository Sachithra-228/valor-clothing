"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function remove() {
    if (!window.confirm(`Delete "${name}"? This removes it from the shop and cannot be undone.`)) return;
    setPending(true);
    try {
      const response = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      if (response.status === 401) return router.replace("/admin/login");
      if (!response.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert(`Could not delete "${name}". Try again.`);
    }
    setPending(false);
  }

  return (
    <button onClick={remove} disabled={pending} className="text-red-400 transition hover:text-red-300 disabled:opacity-50">
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
