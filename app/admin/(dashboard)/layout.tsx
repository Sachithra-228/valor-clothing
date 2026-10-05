import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { LogoImage } from "@/components/ui/logo";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <>
      <header className="border-b border-white/10 px-5 md:px-8">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6">
          <Link href="/admin" aria-label="Admin home" className="flex items-center gap-4">
            <LogoImage className="h-4" />
            <span className="text-xs uppercase tracking-[.22em] text-white/45">Admin</span>
          </Link>
          <nav className="flex items-center gap-6 text-xs uppercase tracking-[.18em] text-white/60">
            <Link href="/admin" className="transition hover:text-white">Products</Link>
            <Link href="/" target="_blank" className="transition hover:text-white">View site</Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </main>
    </>
  );
}
