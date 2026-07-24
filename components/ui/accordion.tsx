"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => (
        <div key={item.title}>
          <button
            className="flex w-full items-center justify-between py-5 text-left text-sm uppercase tracking-[.16em]"
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            {item.title}
            <ChevronDown className={cn("h-4 w-4 transition", open === index && "rotate-180")} />
          </button>
          <div className={cn("grid transition-all duration-300", open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <p className="overflow-hidden pb-5 text-sm leading-7 text-white/60">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
