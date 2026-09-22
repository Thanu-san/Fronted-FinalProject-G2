import React, { Suspense } from "react";
import VerifyForm from "@/components/auth/VerifyForm";

export default function VerifyPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 overflow-hidden bg-zinc-950">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(150px, -100px) scale(1.2); }
          66% { transform: translate(-100px, 150px) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-blue-500/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
            Verify Your Email
          </h1>
          <p className="text-zinc-400 text-sm">
            Enter the code sent to your email to activate your account
          </p>
        </div>
        
        <Suspense fallback={<div className="text-center text-zinc-400">Loading...</div>}>
          <VerifyForm />
        </Suspense>

      </div>
    </main>
  );
}