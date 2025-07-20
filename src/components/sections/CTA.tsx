"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-width">
        <motion.div
          className="relative rounded-3xl bg-white dark:bg-black shadow-md border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative px-6 py-16 md:px-12 md:py-20 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Protect Your IP with Blockchain + AI?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the hackathon demo! Upload your IP, get blockchain timestamps, and see AI monitoring in action. Transform IP protection into passive income.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="default" className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 py-3" asChild>
                  <Link href="/dashboard">Try Live Demo</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-6 py-3" asChild>
                  <Link href="/marketplace">View Marketplace</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                🚀 Hackathon MVP - Full demo available. Built on Solana blockchain.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
