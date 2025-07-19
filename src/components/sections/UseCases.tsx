"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, Paintbrush } from "lucide-react";

export function UseCases() {
  return (
    <section id="use-cases" className="py-20">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Real-World Impact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See how KageLock's blockchain + AI solution protects creators, developers, and businesses from IP theft while generating revenue.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="freelancer" className="w-full">
            <TabsList className="flex w-full max-w-md mx-auto mb-10 bg-gray-100 dark:bg-gray-800/30 p-1 rounded-lg">
              <TabsTrigger value="freelancer" className="flex items-center gap-2 py-2 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="hidden sm:inline font-medium">Freelancer</span>
              </TabsTrigger>
              <TabsTrigger value="startup" className="flex items-center gap-2 py-2 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </div>
                <span className="hidden sm:inline font-medium">Startup</span>
              </TabsTrigger>
              <TabsTrigger value="artist" className="flex items-center gap-2 py-2 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Paintbrush className="h-4 w-4 text-orange-600" />
                </div>
                <span className="hidden sm:inline font-medium">Artist</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="freelancer">
              <motion.div
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">The Freelancer</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Sarah, a graphic designer, using blockchain + AI to protect and monetize her designs
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-medium mb-2 text-sm text-gray-500 uppercase">Challenge</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Sarah creates logos and brand identities for clients. Her work keeps getting stolen and reposted on X, Pinterest, and design platforms without credit or compensation.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <h4 className="font-medium mb-2 text-sm text-blue-500 uppercase">Solution</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Sarah uploads her designs to KageLock, getting blockchain timestamps with zero-knowledge proofs. AI detects theft on X within hours.
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 flex-none">✓</span>
                            <span>Instant alert with screenshot evidence</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 flex-none">✓</span>
                            <span>Automated DMCA takedown sent</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 flex-none">✓</span>
                            <span>Listed on marketplace, earned $200 licensing fee</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium mb-2 text-sm text-green-500 uppercase">Outcome</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Sarah now has blockchain-verified ownership, automated protection, and a new revenue stream from licensing. All while focusing on her creative work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="startup">
              <motion.div
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">The Startup</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          TechFlow, a fintech startup, protecting their payment algorithm with blockchain + AI
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-medium mb-2 text-sm text-gray-500 uppercase">Challenge</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          TechFlow developed a revolutionary payment processing algorithm. They need to prove ownership and prevent code theft on GitHub while patent applications are pending.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                        <h4 className="font-medium mb-2 text-sm text-purple-500 uppercase">Solution</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          TechFlow registers their algorithm on KageLock's Solana blockchain with zero-knowledge proofs, keeping code private while proving ownership.
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 flex-none">✓</span>
                            <span>AI detected GitHub clone within 2 hours</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 flex-none">✓</span>
                            <span>Automated DMCA sent, repo taken down</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 flex-none">✓</span>
                            <span>Blockchain proof supports patent application</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium mb-2 text-sm text-green-500 uppercase">Outcome</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          TechFlow has indisputable blockchain proof of creation date, automated protection from code theft, and can focus on building instead of legal battles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="artist">
              <motion.div
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Paintbrush className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">The Artist</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Alex, a digital artist, protecting NFT art and earning licensing revenue
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-medium mb-2 text-sm text-gray-500 uppercase">Challenge</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Alex creates digital art for NFTs and commercial use. His artwork keeps getting stolen and minted as unauthorized NFTs on different marketplaces, hurting his brand and sales.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                        <h4 className="font-medium mb-2 text-sm text-orange-500 uppercase">Solution</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Alex registers his art on KageLock before minting NFTs, creating blockchain proof of original creation with zero-knowledge privacy.
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 flex-none">✓</span>
                            <span>Blockchain timestamp proves original creation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 flex-none">✓</span>
                            <span>AI detects unauthorized NFT mints, sends takedowns</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 flex-none">✓</span>
                            <span>Marketplace generates $500/month in licensing</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium mb-2 text-sm text-green-500 uppercase">Outcome</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Alex has bulletproof ownership proof, automated theft protection, and a growing passive income from legitimate licensing deals through KageLock's marketplace.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}