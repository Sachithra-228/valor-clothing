import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Film, Heart, Shield, Star } from "lucide-react";
import { OrbitalScene } from "@/components/animations/orbital-scene";
import { Reveal } from "@/components/animations/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { campaignImages, categories, products } from "@/lib/data";


export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
        <Image src={campaignImages.hero} alt="VALOR editorial campaign" fill priority className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(0,0,0,.38)_38%,#000_100%)]" />
        <div className="absolute inset-0 opacity-50"><OrbitalScene /></div>
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="mb-8 font-display text-4xl font-black uppercase tracking-[.7em] text-white md:text-7xl">VALOR</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="font-display text-6xl font-black uppercase leading-[.88] md:text-9xl lg:text-[10.5rem]">Defined by Valor.</h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-8 max-w-xl text-sm uppercase leading-7 tracking-[.22em] text-white/68">Luxury uniforms shaped through silence, discipline, and architectural restraint.</p>
          </Reveal>
          <Reveal delay={0.38}>
            <Link href="/shop" className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[.18em] text-black transition hover:bg-silver">
              Shop Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] uppercase tracking-[.28em]">Scroll</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 py-5">
        <div className="marquee flex w-[200%] gap-10 whitespace-nowrap font-display text-5xl uppercase text-white/15 md:text-8xl">
          {Array.from({ length: 8 }).map((_, index) => <span key={index}>New Discipline / Core Noir / Winter Silence /</span>)}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[.24em] text-white/40">Featured Collection</p>
              <h2 className="mt-4 font-display text-5xl uppercase md:text-7xl">Core Noir</h2>
            </div>
            <Link href="/collections" className="hidden items-center gap-2 text-xs uppercase tracking-[.2em] text-white/55 transition hover:text-white md:flex">View all <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => <Reveal key={product.id} delay={index * 0.05}><ProductCard product={product} priority={index < 2} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Reveal key={category} delay={index * 0.05} className="group relative min-h-[420px] overflow-hidden rounded-lg bg-white/5 lg:odd:mt-16">
              <Image src={products[index % products.length].images[0]} alt={category} fill className="object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xs uppercase tracking-[.24em] text-white/45">Category</p>
                <h3 className="mt-2 font-display text-3xl uppercase">{category}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <div className="sticky top-28">
              <p className="text-xs uppercase tracking-[.24em] text-white/40">Brand Story</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-8xl">Quiet power, engineered daily.</h2>
              <p className="mt-8 max-w-md text-sm leading-7 text-white/58">VALOR studies restraint as a design language: sharp proportions, grounded materials, and pieces that carry presence without spectacle.</p>
            </div>
          </Reveal>
          <div className="grid gap-5">
            {[["01", "Pattern discipline"], ["02", "Material severity"], ["03", "Limited release"], ["04", "Global uniform"]].map(([num, text]) => (
              <Reveal key={num} className="grid grid-cols-[80px_1fr] border-t border-white/10 py-9">
                <span className="font-display text-5xl text-white/18">{num}</span>
                <p className="font-display text-3xl uppercase md:text-5xl">{text}</p>
              </Reveal>
            ))}
            <Reveal><Image src={campaignImages.story} alt="VALOR atelier story" width={1200} height={800} className="h-[560px] w-full rounded-lg object-cover" /></Reveal>
          </div>
        </div>
      </section>

      <section className="relative min-h-[80vh] overflow-hidden px-5 py-24 md:px-8">
        <Image src={campaignImages.video} alt="VALOR fashion campaign" fill className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-black/45" />
        <Reveal className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1500px] flex-col justify-end">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[.24em] text-white/55"><Film className="h-4 w-4" /> Campaign Film</div>
          <h2 className="mt-5 max-w-4xl font-display text-6xl uppercase leading-none md:text-9xl">Silence has weight.</h2>
          <Button variant="outline" className="mt-8 w-fit">Play</Button>
        </Reveal>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1500px]">
          <Reveal><h2 className="font-display text-5xl uppercase md:text-8xl">Lookbook</h2></Reveal>
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {[...products, ...products.slice(0, 3)].map((product, index) => (
              <Reveal key={`${product.id}-${index}`} className="mb-5 break-inside-avoid overflow-hidden rounded-lg">
                <Image src={product.images[index % 2]} alt="VALOR lookbook" width={700} height={index % 2 ? 980 : 760} className="w-full object-cover transition duration-700 hover:scale-[1.025]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-5 md:grid-cols-3">
          {[
            ["Luxury buyers", "The restraint feels intentional from first touch.", Star],
            ["Private clients", "VALOR is minimal without feeling empty.", Shield],
            ["Editorial desk", "A disciplined capsule with a strong visual code.", Heart]
          ].map(([title, copy, Icon]) => (
            <Reveal key={String(title)} className="rounded-lg border border-white/10 bg-white/[.04] p-8 backdrop-blur">
              <Icon className="h-5 w-5" />
              <p className="mt-10 font-display text-2xl uppercase">{title as string}</p>
              <p className="mt-4 text-sm leading-7 text-white/55">{copy as string}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8">
        <Reveal className="mx-auto max-w-[1100px] text-center">
          <p className="text-xs uppercase tracking-[.24em] text-white/40">Private Access</p>
          <h2 className="mt-5 font-display text-5xl uppercase leading-none md:text-8xl">Receive the next drop before it surfaces.</h2>
          <form className="mx-auto mt-10 flex max-w-xl rounded-full border border-white/15 p-1">
            <input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-white/35" />
            <button className="rounded-full bg-white px-6 text-xs font-bold uppercase tracking-[.18em] text-black">Enter</button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}
