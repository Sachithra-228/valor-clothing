"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [point, setPoint] = useState({ x: -80, y: -80 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[80] hidden h-8 w-8 rounded-full border border-white/35 mix-blend-difference transition-transform duration-100 lg:block"
      style={{ transform: `translate3d(${point.x - 16}px, ${point.y - 16}px, 0)` }}
    />
  );
}
