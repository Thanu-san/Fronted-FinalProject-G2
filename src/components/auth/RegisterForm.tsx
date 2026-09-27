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
        router.push("/verify");
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
      <form onSubmit={handleRegister} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/50 text-white text-sm text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Username Input */}
        <div className="relative">
          <input 
            id="username"
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" 
            className="w-full bg-transparent border border-white/40 rounded-full px-6 py-3 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            required
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </div>

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
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
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
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <input 
            id="confirm-password"
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password" 
            className="w-full bg-transparent border border-white/40 rounded-full px-6 py-3 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            required
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 mt-6 font-bold text-purple-900 bg-white rounded-full transition-all duration-300 ease-out hover:bg-white/95 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-white/90 mt-8">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-white hover:underline transition-all">
          Sign in
        </Link>
      </p>
    </>
  );
}