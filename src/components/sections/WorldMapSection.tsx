"use client";

import { WorldMapDemo } from "@/components/ui/world-map-demo";

export function WorldMapSection() {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container-width">
        <WorldMapDemo />
      </div>
    </section>
  );
}
