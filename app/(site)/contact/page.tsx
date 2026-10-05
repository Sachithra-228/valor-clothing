import type { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="px-5 pt-28 md:px-8">
      <section className="mx-auto grid max-w-[1500px] gap-10 py-16 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-white/40">Contact</p>
          <h1 className="mt-5 font-display text-6xl uppercase leading-none md:text-9xl">Private studio access.</h1>
          <p className="mt-8 text-sm leading-7 text-white/55">VALOR Studio, Colombo. Worldwide client service Monday to Friday.</p>
        </div>
        <form className="grid gap-4 rounded-lg border border-white/10 p-5 md:p-8">
          {["Name", "Email", "Subject"].map((label) => <input key={label} aria-label={label} placeholder={label} className="h-14 rounded-md border border-white/10 bg-white/[.03] px-4 outline-none" />)}
          <textarea aria-label="Message" placeholder="Message" rows={7} className="rounded-md border border-white/10 bg-white/[.03] p-4 outline-none" />
          <button className="h-12 rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black">Send</button>
        </form>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-8 pb-24 lg:grid-cols-2">
        <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111,#050505_45%,#2a2a2a)] text-xs uppercase tracking-[.24em] text-white/40">Google Map Embed</div>
        <Accordion items={[
          { title: "Do you ship worldwide?", content: "Yes, VALOR ships to most regions with tracked express partners." },
          { title: "Can I change an order?", content: "Contact client service within one hour of purchase for order adjustments." },
          { title: "Where is the studio?", content: "VALOR operates from Colombo with worldwide digital appointments." }
        ]} />
      </section>
    </main>
  );
}
