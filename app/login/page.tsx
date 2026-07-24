import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 pt-28">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white/[.04] p-8 shadow-luxury backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[.24em] text-white/45">Account</p>
        <h1 className="mt-4 font-display text-5xl uppercase">Enter VALOR</h1>
        <form className="mt-8 grid gap-4">
          <input aria-label="Email" placeholder="Email" className="h-13 rounded-md border border-white/10 bg-black/30 px-4 py-4 outline-none" />
          <input aria-label="Password" type="password" placeholder="Password" className="h-13 rounded-md border border-white/10 bg-black/30 px-4 py-4 outline-none" />
          <button className="mt-2 h-12 rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black">Login</button>
        </form>
        <div className="mt-6 flex justify-between text-xs uppercase tracking-[.16em] text-white/45">
          <Link href="/register">Register</Link>
          <Link href="/forgot-password">Forgot Password</Link>
        </div>
      </section>
    </main>
  );
}
