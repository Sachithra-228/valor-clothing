import { Package, MapPin, User, Settings } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="px-5 pt-28 md:px-8">
      <section className="mx-auto max-w-[1500px] py-16">
        <p className="text-xs uppercase tracking-[.24em] text-white/40">Dashboard</p>
        <h1 className="mt-5 font-display text-6xl uppercase md:text-9xl">Client room.</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[[Package, "Orders"], [User, "Profile"], [MapPin, "Addresses"], [Settings, "Settings"]].map(([Icon, title]) => {
            const LucideIcon = Icon as typeof Package;
            return (
              <div key={String(title)} className="rounded-lg border border-white/10 p-8">
                <LucideIcon className="h-6 w-6" />
                <p className="mt-12 font-display text-3xl uppercase">{title as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
