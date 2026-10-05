export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 pt-28">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white/[.04] p-8 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[.24em] text-white/45">Reset</p>
        <h1 className="mt-4 font-display text-5xl uppercase">Recover access.</h1>
        <form className="mt-8 grid gap-4">
          <input aria-label="Email" placeholder="Email" className="rounded-md border border-white/10 bg-black/30 px-4 py-4 outline-none" />
          <button className="mt-2 h-12 rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black">Send Link</button>
        </form>
      </section>
    </main>
  );
}
