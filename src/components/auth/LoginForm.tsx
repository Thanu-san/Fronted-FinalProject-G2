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
          <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/50 text-white text-sm text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="relative">
          <input 
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address" 
            className="w-full bg-transparent border border-white/40 rounded-full px-6 py-3 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            required
          />
          {/* User Icon on the right */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </div>

        {/* Password Input */}
        <div className="relative">
          <input 
            id="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            className="w-full bg-transparent border border-white/40 rounded-full px-6 py-3 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            required
          />
          {/* Lock Icon on the right */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between px-2 pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded-sm border-white/40 bg-transparent checked:bg-white text-purple-600 focus:ring-white/50 focus:ring-offset-0 cursor-pointer" />
            <span className="text-sm text-white/90 group-hover:text-white transition-colors">Remember me</span>
          </label>
          
          <Link href="/forgot-password" className="text-sm text-white/90 hover:text-white hover:underline transition-colors">
            Forgot password?
          </Link>
        </div>

        {/* Animated Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 mt-4 font-bold text-purple-900 bg-white rounded-full transition-all duration-300 ease-out hover:bg-white/95 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-white/90 mt-8">
        Don't have an account?{" "}
        <Link href="/register" className="font-bold text-white hover:underline transition-all">
          Register
        </Link>
      </p>
    </>
  );
}