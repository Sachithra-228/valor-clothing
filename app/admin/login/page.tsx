import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { LogoImage } from "@/components/ui/logo";
import { isAdmin } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white/[.04] p-8">
        <LogoImage priority />
        <h1 className="mt-8 font-display text-4xl uppercase">Admin</h1>
        <p className="mt-2 text-sm text-white/55">Sign in to manage products.</p>
        <LoginForm />
      </section>
    </main>
  );
}
