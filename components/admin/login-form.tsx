"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
      });
      if (response.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Could not sign in.");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-white/55">
        Email
        <input name="email" type="email" autoComplete="username" required className="h-12 rounded-md border border-white/10 bg-black/30 px-4 text-sm normal-case tracking-normal text-white outline-none focus:border-white/40" />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-white/55">
        Password
        <input name="password" type="password" autoComplete="current-password" required className="h-12 rounded-md border border-white/10 bg-black/30 px-4 text-sm normal-case tracking-normal text-white outline-none focus:border-white/40" />
      </label>
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button disabled={pending} className="mt-2 h-12 rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black transition hover:bg-silver disabled:opacity-50">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
