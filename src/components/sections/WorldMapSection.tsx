"use client";

import { WorldMapDemo } from "@/components/ui/world-map-demo";

export function WorldMapSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container-width">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Global IP Protection Network</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            KageLock's AI monitors platforms worldwide, protecting creators across continents with blockchain-verified ownership.
          </p>
        </div>
        <WorldMapDemo />
      </div>
    </section>
  );
}
