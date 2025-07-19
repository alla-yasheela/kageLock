"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize motion values only after component mounts
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transform values depend on motion values, so we need to ensure client-side execution
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const cardControls = useAnimation();

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return;

    const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!isClient) return;

    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      cardControls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 2, ease: "easeInOut" }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [cardControls, isClient]);

  return (
    <section className="pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-full">
              🚀 Hackathon MVP - Live Demo Available
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Protect, Monitor & Monetize Your IP with Blockchain + AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Upload your designs, code, or documents. Get timestamped on Solana blockchain with zero-knowledge proofs. AI monitors X, GitHub & more 24/7. Automated takedowns. Built-in marketplace for licensing deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                asChild
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
              >
                <Link href="/signup">Try Live Demo</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-lg font-medium group"
              >
                <Link href="/dashboard" className="flex items-center">
                  View Dashboard Demo
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="pt-6 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>AI-powered monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Solana blockchain + ZKP</span>
              </div>
            </div>
          </motion.div>
          {isClient && (
            <div
              ref={containerRef}
              className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="p-8 h-full flex flex-col transform-style-3d">
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <motion.div
                      className="relative w-full max-w-md mx-auto"
                      style={{ z: 20, translateZ: "40px" }}
                      animate={cardControls}
                    >
                      <motion.div
                        className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-blue-400"
                        animate={{
                          boxShadow: ["0 0 0px rgba(59, 130, 246, 0.5)", "0 0 20px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0.5)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <motion.div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"
                        animate={{
                          boxShadow: ["0 0 0px rgba(168, 85, 247, 0.5)", "0 0 20px rgba(168, 85, 247, 0.8)", "0 0 0px rgba(168, 85, 247, 0.5)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 0.6
                        }}
                      />
                      <motion.div
                        className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-green-400"
                        animate={{
                          boxShadow: ["0 0 0px rgba(74, 222, 128, 0.5)", "0 0 20px rgba(74, 222, 128, 0.8)", "0 0 0px rgba(74, 222, 128, 0.5)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1.2
                        }}
                      />
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
                        style={{ translateZ: "60px" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div
                            className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 0, 0, 0, 0, 10, -10, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
                            }}
                          >
                            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </motion.div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Live IP Protection Demo</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Solana blockchain + AI monitoring active</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <motion.div
                            className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden relative"
                          >
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                          <motion.div
                            className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4 overflow-hidden relative"
                          >
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: 0.5
                              }}
                            />
                          </motion.div>
                          <motion.div
                            className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-1/2 overflow-hidden relative"
                          >
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-orange-500"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: 1
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          {!isClient && (
            <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                {/* Static placeholder for SSR */}
                <div className="p-8 h-full flex flex-col">
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="relative w-full max-w-md mx-auto">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Your IP is Secure with Us</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Protected with blockchain technology</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-full"></div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4"></div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}