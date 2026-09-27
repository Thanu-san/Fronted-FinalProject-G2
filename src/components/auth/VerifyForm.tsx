"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyForm() {
  const router = useRouter();
  
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // The API requires the token in the URL query, NOT in the body
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify-email?token=${token}`, {
        method: "POST",
      });

      if (response.ok) {
        // Once verified, send them to login
        router.push("/login");
      } else {
        const textResponse = await response.text();
        let errorMsg = "Invalid verification token. Please try again.";
        try {
          const data = JSON.parse(textResponse);
          if (data.message || data.description) errorMsg = data.message || data.description;
        } catch {
          if (textResponse) errorMsg = textResponse;
        }
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Verify fetch error:", err);
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/50 text-white text-sm text-center backdrop-blur-sm">
          {error}
        </div>
      )}

      <div className="relative">
        <input 
          id="token"
          type="text" 
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Verification Token" 
          className="w-full bg-transparent border border-white/40 rounded-full px-6 py-3 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-center tracking-widest"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-3 mt-2 font-bold text-purple-900 bg-white rounded-full transition-all duration-300 ease-out hover:bg-white/95 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 disabled:opacity-50 flex justify-center"
      >
        {isLoading ? "Verifying..." : "Verify Account"}
      </button>

      <div className="text-center mt-6">
        <Link href="/login" className="text-sm text-white/90 hover:text-white hover:underline transition-colors">
          Back to Login
        </Link>
      </div>
    </form>
  );
}