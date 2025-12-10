"use client";

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export function HireMeSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-transparent via-neutral-950 to-transparent">
      <VelocityScroll
        text="Wanna Grow with me • Hire me • Let's Build Together • "
        default_velocity={1}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm md:text-7xl md:leading-[5rem]"
      />
    </section>
  );
}
