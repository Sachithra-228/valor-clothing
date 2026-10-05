import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/animations/reveal";
import { campaignImages } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="pt-28">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[.24em] text-white/40">About VALOR</p>
            <h1 className="mt-5 font-display text-6xl uppercase leading-none md:text-9xl">A house built on restraint.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-xl text-lg leading-9 text-white/62">VALOR creates premium clothing for people who want presence without excess. Every release is edited, deliberate, and shaped around proportion, touch, and longevity.</p>
          </Reveal>
        </div>
      </section>
      <Image src={campaignImages.atelier} alt="VALOR founder editorial" width={1800} height={1000} className="h-[70vh] w-full object-cover opacity-80" />
      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-3">
          {["Mission: define modern luxury through disciplined essentials.", "Vision: become the quiet uniform for a global creative class.", "Values: restraint, craft, proportion, permanence."].map((text) => (
            <Reveal key={text} className="rounded-lg border border-white/10 p-8">
              <p className="font-display text-2xl uppercase leading-tight">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
