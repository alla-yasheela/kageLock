"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Use Cases", href: "#use-cases" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#documentation" },
        { label: "API", href: "#api" },
        { label: "Blog", href: "#blog" },
        { label: "Support", href: "#support" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
        { label: "Legal", href: "#legal" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Twitter", href: "#twitter", icon: <Twitter className="h-5 w-5" /> },
    { label: "Facebook", href: "#facebook", icon: <Facebook className="h-5 w-5" /> },
    { label: "Instagram", href: "#instagram", icon: <Instagram className="h-5 w-5" /> },
    { label: "LinkedIn", href: "#linkedin", icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 pt-16 pb-8">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {/* Brand & Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">kageLock</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md text-sm leading-relaxed">
              Secure, monitor, enforce, and monetize your intellectual property with unmatched speed and security.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2"></div>

          {/* Links */}
          {footerLinks.map((column, index) => (
            <div key={index} className="lg:col-span-2">
              <h3 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-200">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <p>© {currentYear} kageLock. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-blue-600">Terms of Service</Link>
            <Link href="#cookies" className="hover:text-blue-600">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
