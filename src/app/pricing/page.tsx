"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Footerdemo } from "@/components/ui/footer-section";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null); // State for FAQ

  const plans = [
    {
      name: "Free",
      price: {
        monthly: "$0",
        annual: "$0",
      },
      description: "Basic protection for individuals",
      features: [
        { name: "3 Protected Assets", included: true },
        { name: "Basic AI Monitoring", included: true },
        { name: "Email Alerts", included: true },
        { name: "Blockchain Verification", included: true },
        { name: "Automated Takedowns", included: false },
        { name: "24/7 Support", included: false },
        { name: "Dark Web Monitoring", included: false },
        { name: "API Access", included: false },
      ],
      cta: "Get Started",
      ctaLink: "/signup",
      popular: false,
    },
    {
      name: "Professional",
      price: {
        monthly: "$29",
        annual: "$19",
      },
      description: "Complete protection for freelancers",
      features: [
        { name: "25 Protected Assets", included: true },
        { name: "Advanced AI Monitoring", included: true },
        { name: "Real-time Alerts", included: true },
        { name: "Blockchain Verification", included: true },
        { name: "Automated Takedowns", included: true },
        { name: "24/7 Support", included: true },
        { name: "Dark Web Monitoring", included: false },
        { name: "API Access", included: false },
      ],
      cta: "Start Free Trial",
      ctaLink: "/signup?plan=professional",
      popular: true,
    },
    {
      name: "Business",
      price: {
        monthly: "$99",
        annual: "$79",
      },
      description: "Advanced protection for teams",
      features: [
        { name: "Unlimited Protected Assets", included: true },
        { name: "Premium AI Monitoring", included: true },
        { name: "Real-time Alerts", included: true },
        { name: "Blockchain Verification", included: true },
        { name: "Automated Takedowns", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "Dark Web Monitoring", included: true },
        { name: "API Access", included: true },
      ],
      cta: "Start Free Trial",
      ctaLink: "/signup?plan=business",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How does the Free plan work?",
      answer:
        "The Free plan allows you to protect up to 3 assets with our basic AI monitoring. You'll receive email alerts for potential IP matches and can register your assets with blockchain verification. It's perfect for individuals just getting started with IP protection.",
    },
    {
      question: "What is blockchain verification?",
      answer:
        "Blockchain verification creates an immutable timestamp proof of your intellectual property ownership. We use zero-knowledge proofs (ZKP) to ensure your actual content remains private while still providing cryptographic evidence of ownership.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time. When you upgrade, we'll prorate the remaining days on your current plan and apply it to your new plan.",
    },
    {
      question: "How do automated takedowns work?",
      answer:
        "When our AI detects a potential IP infringement, Professional and Business plans can enable automatic DMCA takedown notices to be sent to the hosting platform. You'll receive notifications of the status and can override any actions.",
    },
    {
      question: "Do you offer custom enterprise plans?",
      answer:
        "Yes, we offer tailored enterprise solutions for larger organizations with specific needs. Contact our sales team for a custom quote and feature set.",
    },
  ];

  // FAQ toggle function
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />
      <div className="flex-grow pt-24 pb-12">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the plan that fits your intellectual property protection needs
            </p>
            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  billingPeriod === "monthly"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  billingPeriod === "annual"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setBillingPeriod("annual")}
              >
                Annual <span className="text-green-500 text-xs">Save 30%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`pricing-card relative ${plan.popular ? "pricing-popular border-2" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-600 text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price[billingPeriod]}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {plan.price.monthly !== "$0" &&
                        `/${billingPeriod === "monthly" ? "mo" : "mo, billed annually"}`}
                    </span>
                  </div>

                  <Button
                    className={`w-full mb-6 rounded-lg ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                    asChild
                  >
                    <Link href={plan.ctaLink}>{plan.cta}</Link>
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mr-2" />
                        )}
                        <span className={feature.included ? "" : "text-gray-500"}>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Enterprise */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Need a custom solution?</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We offer tailored plans for enterprises with specific requirements. Contact our sales team to discuss your
                  needs.
                </p>
              </div>
              <Button
                className="whitespace-nowrap rounded-lg px-6 py-6 bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                size="lg"
                asChild
              >
                <Link href="#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  <button
                    className="flex items-center justify-between w-full py-4 px-6 text-lg font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openFAQIndex === index}
                  >
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    {openFAQIndex === index ? (
                      <ChevronUp className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  {openFAQIndex === index && (
                    <div className="py-4 px-6 text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footerdemo />
    </main>
  );
}
