"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Github, ArrowRight, CheckCircle2 } from "lucide-react";
import { Footerdemo } from "@/components/ui/footer-section";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(0);

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
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div className="container-width">
          <div className="max-w-md mx-auto">
            {formStep === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm"
              >
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Join KageLock to protect your IP with blockchain + AI technology
                    </p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>

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
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-input pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Must be at least 8 characters and include a number and a special character
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          By checking this, you agree to our{" "}
                          <Link href="#terms" className="text-blue-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5"
                      disabled={loading || !agreeTerms}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-lg"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Log in
                      </Link>
                    </p>
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
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
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
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="w-1/2 rounded-lg"
                      onClick={() => setFormStep(0)}
                    >
                      Back
                    </Button>
                    <Button
                      className="w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <Link href="/login">Go to Login</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footerdemo />
    </main>
  );
}
