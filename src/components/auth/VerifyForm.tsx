"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify-email?token=${encodeURIComponent(code)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        data = textResponse;
      }

      if (response.ok) {
        setSuccess("Account verified successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        let errorMsg = "Verification failed";
        const rawDescription = typeof data === "object" ? (data?.description || data?.message || data?.error || "") : data;
        if (typeof rawDescription === "string" && rawDescription.length > 0) {
          errorMsg = rawDescription;
        }
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleVerify} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input 
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" 
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="code">
            Verification Code / OTP
          </label>
          <input 
            id="code"
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code" 
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm text-center tracking-widest text-lg font-mono"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 shadow-md shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-400 mt-6">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}