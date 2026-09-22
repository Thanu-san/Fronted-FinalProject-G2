"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          confirmPassword,
          address: {}
        }),
      });

      const textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        data = textResponse;
      }

      if (response.ok) {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        let errorMsg = "Failed to create account";
        const rawDescription = typeof data === "object" ? (data?.description || data?.message || data?.error || "") : data;

        if (typeof rawDescription === "string" && rawDescription.length > 0) {
          errorMsg = rawDescription;
        }

        setError(errorMsg);
      }
    } catch (err) {
      console.error("Register fetch error:", err);
      setError("Failed to connect to the server. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="username">
            Username
          </label>
          <input 
            id="username"
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe" 
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
            required
          />
        </div>

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
          <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="password">
            Password
          </label>
          <input 
            id="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input 
            id="confirm-password"
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 shadow-md shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-400 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}