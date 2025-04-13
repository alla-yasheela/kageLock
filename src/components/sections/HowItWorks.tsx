"use client";

import Image from "next/image";
import { Shield, Search, AlertTriangle, Wallet } from "lucide-react";
import { FeatureStepsDemo } from "@/components/blocks/feature-section-demo";

const steps = [
  {
    title: "Register",
    description:
      "Upload your IP—code, designs, docs—to our platform. We hash it and timestamp it on a blockchain using ZKP, creating an indisputable ownership record without revealing the content.",
    icon: <Shield className="h-6 w-6" />,
    color: "process-icon-blue",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-500",
  },
  {
    title: "Monitor",
    description:
      "Our generative AI scans platforms like GitHub, Behance, and NFT marketplaces 24/7, flagging any matches to your IP.",
    icon: <Search className="h-6 w-6" />,
    color: "process-icon-purple",
    bgColor: "bg-purple-50",
    iconBgColor: "bg-purple-500",
  },
  {
    title: "Enforce",
    description:
      "Get instant alerts with evidence (screenshots, links). Choose automated takedown notices or escalate to our legal partners.",
    icon: <AlertTriangle className="h-6 w-6" />,
    color: "process-icon-orange",
    bgColor: "bg-orange-50",
    iconBgColor: "bg-orange-500",
  },
  {
    title: "Monetize",
    description:
      "List your IP on our marketplace—smart contracts handle licensing deals, putting cash in your pocket.",
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
