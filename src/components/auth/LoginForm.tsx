"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        data = textResponse;
      }

      if (response.ok) {
        const token = typeof data === "object" ? (data.token || data.access_token || data.data?.token) : null;
        if (token) localStorage.setItem("token", token);
        router.push("/");
        router.refresh(); 
      } else {
        let errorMsg = "Invalid email or password";
        
        const rawDescription = typeof data === "object" ? (data?.description || data?.message || data?.error || "") : data;

        if (response.status === 404 || (typeof rawDescription === "string" && rawDescription.toLowerCase().includes("not found"))) {
          errorMsg = "User with this email does not exist. Please create an account.";
        } else if (typeof rawDescription === "string" && rawDescription.length > 0) {
          errorMsg = rawDescription;
        }

        setError(errorMsg);
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Failed to connect to the server. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
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
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="password">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
              Forgot password?
            </Link>
          </div>
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

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-2 shadow-md shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-400 mt-6">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
          Create one
        </Link>
      </p>
    </>
  );
}