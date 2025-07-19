"use client";

import Image from "next/image";
import { Shield, Search, AlertTriangle, Wallet } from "lucide-react";
import { FeatureStepsDemo } from "@/components/blocks/feature-section-demo";

const steps = [
  {
    title: "Register",
    description:
      "Upload your IP assets (code, designs, documents) to our platform. We create a cryptographic hash and timestamp it on Solana blockchain using zero-knowledge proofs, establishing indisputable ownership without revealing your content.",
    icon: <Shield className="h-6 w-6" />,
    color: "process-icon-blue",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-500",
  },
  {
    title: "Monitor",
    description:
      "Our AI continuously scans X (Twitter), GitHub, Behance, Pinterest, NFT marketplaces, and the broader web 24/7, using advanced similarity detection to flag potential unauthorized use of your IP.",
    icon: <Search className="h-6 w-6" />,
    color: "process-icon-purple",
    bgColor: "bg-purple-50",
    iconBgColor: "bg-purple-500",
  },
  {
    title: "Enforce",
    description:
      "Receive instant alerts with concrete evidence including screenshots, URLs, and similarity scores. Send automated DMCA takedown notices or escalate to our integrated legal partners for serious violations.",
    icon: <AlertTriangle className="h-6 w-6" />,
    color: "process-icon-orange",
    bgColor: "bg-orange-50",
    iconBgColor: "bg-orange-500",
  },
  {
    title: "Monetize",
    description:
      "List your protected IP on our marketplace for licensing opportunities. Smart contracts automatically handle negotiations, payments, and royalties, creating passive income from your intellectual property.",
    icon: <Wallet className="h-6 w-6" />,
    color: "process-icon-green",
    bgColor: "bg-green-50",
    iconBgColor: "bg-green-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="container-width">
        <FeatureStepsDemo />
      </div>
    </section>
  );
}
