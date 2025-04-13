"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formStep, setFormStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setFormStep(1);
      toast.success("Sign up successful! Check your email for next steps.");
    }, 1500);
  };

  return (
    <section id="signup" className="py-20 bg-gray-50 dark:bg-gray-900/10">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Get started with kageLock</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create an account to start protecting your intellectual property today.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {formStep === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm"
            >
              <div className="p-8">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm text-center"
            >
              <div className="p-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Registration Successful!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Check your email at <span className="font-semibold">{email}</span> to complete your account setup.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2 text-sm">What's next?</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 text-left space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-none">✓</span>
                      <span>Verify your email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-none">✓</span>
                      <span>Complete your profile setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-none">✓</span>
                      <span>Upload your first IP asset for protection</span>
                    </li>
                  </ul>
                </div>
                <Button onClick={() => setFormStep(0)} variant="outline" className="w-full rounded-lg">
                  Return to Sign Up
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
