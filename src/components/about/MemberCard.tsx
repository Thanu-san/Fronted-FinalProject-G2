"use client";

import React from "react";
import Image from "next/image";
import { Award, Crown, ShieldCheck, Code2 } from "lucide-react";
import { TeamMember } from "@/data/teamData";

// Custom branded SVGs for social platforms (GitHub and Telegram)
function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 transition-transform duration-300 group-hover/icon:scale-110"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 transition-transform duration-300 group-hover/icon:scale-110"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

interface MemberCardProps {
  member: TeamMember;
  featured?: boolean;
}

export default function MemberCard({ member, featured = false }: MemberCardProps) {
  const isMentor = member.category === "mentor";
  const isLeader = member.category === "leader";
  const isSubLeader = member.category === "sub-leader";

  // Dynamic theme colors based on role hierarchy
  const theme = isMentor
    ? {
        roleColor: "text-emerald-600 dark:text-emerald-400",
        dividerBg: "bg-emerald-500",
        orbitRing: "border-emerald-500/60 dark:border-emerald-400/70",
        breatheRing: "border-emerald-500/30 dark:border-emerald-400/40 shadow-emerald-500/20",
        badgeBorder: "border-amber-400/80 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-amber-400/20",
        badgeIcon: <Award className="w-3.5 h-3.5 text-amber-500" />,
        topGradient: "from-emerald-500/20 via-primary/10 to-transparent",
      }
    : isLeader
    ? {
        roleColor: "text-amber-600 dark:text-amber-400",
        dividerBg: "bg-amber-500",
        orbitRing: "border-amber-500/60 dark:border-amber-400/70",
        breatheRing: "border-amber-500/30 dark:border-amber-400/40 shadow-amber-500/20",
        badgeBorder: "border-amber-500/80 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-amber-500/20",
        badgeIcon: <Crown className="w-3.5 h-3.5 text-amber-500" />,
        topGradient: "from-amber-500/20 via-indigo-500/10 to-transparent",
      }
    : isSubLeader
    ? {
        roleColor: "text-amber-600 dark:text-amber-400",
        dividerBg: "bg-amber-500",
        orbitRing: "border-amber-500/60 dark:border-amber-400/70",
        breatheRing: "border-amber-500/30 dark:border-amber-400/40 shadow-amber-500/20",
        badgeBorder: "border-amber-500/80 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-amber-500/20",
        badgeIcon: <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />,
        topGradient: "from-amber-500/20 via-indigo-500/10 to-transparent",
      }
    : {
        roleColor: "text-indigo-600 dark:text-indigo-400",
        dividerBg: "bg-indigo-500",
        orbitRing: "border-indigo-400/60 dark:border-indigo-400/60",
        breatheRing: "border-indigo-400/30 dark:border-indigo-400/30 shadow-indigo-500/15",
        badgeBorder: "border-indigo-300/80 dark:border-indigo-500/50 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-indigo-500/15",
        badgeIcon: <Code2 className="w-3.5 h-3.5 text-indigo-500" />,
        topGradient: "from-indigo-500/15 via-transparent to-transparent",
      };

  return (
    <div
      className={`group relative flex flex-col items-center justify-between h-full w-full max-w-[330px] sm:max-w-[340px] mx-auto rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 px-6 py-7 sm:px-7 sm:py-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 overflow-hidden ${
        featured ? "shadow-lg border-emerald-500/30" : "shadow-sm"
      }`}
    >
      {/* Decorative top ambient glow bar */}
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-36 w-4/5 rounded-full bg-gradient-to-b ${theme.topGradient} blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />

      {/* ── Avatar with Orbital Rings ────────────────────────────────── */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Outer subtle breathing glow aura */}
        <div
          className={`absolute -inset-2 rounded-full border ${theme.breatheRing} opacity-75 blur-xs transition-transform duration-500 group-hover:scale-105`}
          style={{
            animation: "breathe 3s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        {/* Orbiting dashed ring */}
        <div
          className={`absolute -inset-0.5 rounded-full border-2 border-dashed ${theme.orbitRing} transition-all duration-300`}
          style={{
            animation: "spin 45s linear infinite",
          }}
          aria-hidden="true"
        />

        {/* Inner solid border ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white dark:border-zinc-900 shadow-inner"
          aria-hidden="true"
        />

        {/* Member Photo */}
        <div
          className={`relative overflow-hidden rounded-full border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 shadow-md ${
            featured ? "h-40 w-40 sm:h-44 sm:w-44" : "h-36 w-36 sm:h-38 sm:w-38"
          }`}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 150px, 180px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
            priority={isMentor}
          />
        </div>
      </div>

      {/* ── Member Details ────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center w-full flex-1 justify-between">
        <div className="flex flex-col items-center">
          {/* Full Name */}
          <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white transition-colors duration-200 group-hover:text-primary">
            {member.name}
          </h3>

          {/* Role Subtitle */}
          <p className={`mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider ${theme.roleColor}`}>
            {member.role}
          </p>

          {/* Decorative Divider Accent */}
          <div
            className={`my-3 h-[2px] w-10 rounded-full ${theme.dividerBg} transition-all duration-300 group-hover:w-16`}
            aria-hidden="true"
          />

          {/* ── Role Badge Pill ───────────────────────────────────────── */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-[11px] font-extrabold tracking-widest uppercase shadow-xs transition-all duration-300 group-hover:scale-105 ${theme.badgeBorder}`}
          >
            {theme.badgeIcon}
            <span>{member.badge}</span>
          </div>
        </div>

        {/* ── Social Action Icons (GitHub & Telegram only) ────────────── */}
        <div className="mt-4 flex items-center justify-center gap-3">
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s GitHub Profile`}
              title="GitHub Profile"
              className="group/icon flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#181717] hover:bg-[#181717] hover:text-white hover:shadow-md"
            >
              <GitHubIcon />
            </a>
          )}

          {member.links.telegram && (
            <a
              href={member.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s Telegram`}
              title="Chat on Telegram"
              className="group/icon flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#229ED9] hover:bg-[#229ED9] hover:text-white hover:shadow-md"
            >
              <TelegramIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
