import React from "react";
import VerifyForm from "@/components/auth/VerifyForm";
import bgImage from "@/assets/img.jpg"; 

export default function VerifyPage() {
  const stars = [
    { top: "5%", left: "10%", delay: "0s", size: "2px" },
    { top: "15%", left: "25%", delay: "1.5s", size: "3px" },
    { top: "8%", left: "45%", delay: "0.5s", size: "2px" },
    { top: "25%", left: "15%", delay: "2s", size: "1px" },
    { top: "12%", left: "65%", delay: "1.2s", size: "3px" },
    { top: "20%", left: "80%", delay: "0.8s", size: "2px" },
    { top: "6%", left: "85%", delay: "2.5s", size: "2px" },
    { top: "35%", left: "5%", delay: "1.8s", size: "1px" },
    { top: "30%", left: "35%", delay: "0.3s", size: "2px" },
    { top: "18%", left: "55%", delay: "2.2s", size: "1px" },
    { top: "28%", left: "75%", delay: "1.1s", size: "2px" },
    { top: "32%", left: "90%", delay: "0.9s", size: "3px" },
  ];

  return (
    <main 
      className="relative flex min-h-screen w-full items-center justify-center px-4 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle { animation: twinkle 3s infinite ease-in-out; }
      `}} />

      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              top: star.top, left: star.left, width: star.size, height: star.size,
              animationDelay: star.delay, boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)"
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-purple-950/20 pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-[420px] p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">
            Verify Account
          </h1>
          <p className="text-white/80 text-sm mt-2">
            Enter the token to activate your account
          </p>
        </div>
        
        <VerifyForm />
      </div>
    </main>
  );
}