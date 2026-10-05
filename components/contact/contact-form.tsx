"use client";

import type { FormEvent } from "react";
import { whatsappUrl } from "@/lib/site";

const inputClass = "rounded-md border border-white/10 bg-white/[.03] px-4 outline-none";

// Sends the enquiry as a pre-filled WhatsApp message to VALOR.
export function ContactForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? "").trim();
    const lines = [
      "Hi VALOR,",
      "",
      field("message"),
      "",
      `Name: ${field("name")}`,
      ...(field("email") ? [`Email: ${field("email")}`] : []),
      ...(field("subject") ? [`Subject: ${field("subject")}`] : [])
    ];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-white/10 p-5 md:p-8">
      <input name="name" required aria-label="Name" placeholder="Name" className={`h-14 ${inputClass}`} />
      <input name="email" type="email" aria-label="Email" placeholder="Email (optional)" className={`h-14 ${inputClass}`} />
      <input name="subject" aria-label="Subject" placeholder="Subject" className={`h-14 ${inputClass}`} />
      <textarea name="message" required aria-label="Message" placeholder="Message" rows={7} className={`py-4 ${inputClass}`} />
      <button className="h-12 rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black">Send on WhatsApp</button>
    </form>
  );
}
