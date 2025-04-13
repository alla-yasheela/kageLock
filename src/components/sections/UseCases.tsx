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
            See how kageLock protects intellectual property for different users across various industries.
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
                          Sarah, a graphic designer, protecting her creative work
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-medium mb-2 text-sm text-gray-500 uppercase">Challenge</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Sarah creates logos and brand identities for clients. She's had her work stolen multiple times, appearing on X and other social media without credit or payment.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <h4 className="font-medium mb-2 text-sm text-blue-500 uppercase">Solution</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Sarah uploads her latest logo to kageLock. Our AI spots a copy on X within hours.
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 flex-none">✓</span>
                            <span>Immediate notification with evidence</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 flex-none">✓</span>
                            <span>Auto-takedown notice sent</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 flex-none">✓</span>
                            <span>Licensed design for $200</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium mb-2 text-sm text-green-500 uppercase">Outcome</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Sarah not only protects her work but also monetizes it, creating a new revenue stream. All within a day, without disrupting her creative workflow.
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
                          A fintech team protecting their proprietary algorithm
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-medium mb-2 text-sm text-gray-500 uppercase">Challenge</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          A fintech startup has developed a unique payment processing algorithm. They're concerned about competitors copying their code before they can secure patents.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                        <h4 className="font-medium mb-2 text-sm text-purple-500 uppercase">Solution</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          The team registers their payment algorithm with kageLock using zero-knowledge proofs.
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 flex-none">✓</span>
                            <span>GitHub clone flagged immediately</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 flex-none">✓</span>
                            <span>Access to infringing repo blocked</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 flex-none">✓</span>
                            <span>Legal partner handles infringement</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium mb-2 text-sm text-green-500 uppercase">Outcome</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          The startup maintains their competitive advantage and can focus on scaling rather than legal battles. Their intellectual property remains secure during the vulnerable early stages.
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
                          Jamal, an NFT creator, protecting his digital art
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-medium mb-2 text-sm text-gray-500 uppercase">Challenge</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Jamal creates digital art for the NFT market. He's found unauthorized copies of his work on multiple marketplaces, diluting his brand and stealing potential sales.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                        <h4 className="font-medium mb-2 text-sm text-orange-500 uppercase">Solution</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Jamal registers his digital art collection with kageLock before launching.
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 flex-none">✓</span>
                            <span>Proof of earlier registration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 flex-none">✓</span>
                            <span>Automated removal of copies</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 flex-none">✓</span>
                            <span>Passive income through licensing</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium mb-2 text-sm text-green-500 uppercase">Outcome</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Jamal protects the value of his NFT collection and creates a new revenue stream through licensing. His reputation as an artist remains intact, and his work retains its exclusivity.
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
