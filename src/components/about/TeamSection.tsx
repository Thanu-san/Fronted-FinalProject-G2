"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, ShieldCheck, Code, Sparkles } from "lucide-react";
import MemberCard from "./MemberCard";
import {
  MENTORS,
  TEAM_LEADERS,
  TEAM_MEMBERS,
  ALL_STUDENTS,
  TeamMember,
} from "@/data/teamData";

type FilterTab = "all" | "leaders" | "members";

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredMembers: TeamMember[] =
    activeTab === "all"
      ? ALL_STUDENTS
      : activeTab === "leaders"
      ? TEAM_LEADERS
      : TEAM_MEMBERS;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Decorative ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================
            SECTION 1: OUR MENTOR (Teacher Sokcheat)
        ================================================================ */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 shadow-xs backdrop-blur-xs">
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Guidance & Advisory</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Mentor
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
            Guiding our journey with industry expertise, technical excellence, and dedication to mentoring software engineers at ISTAD.
          </p>
        </div>

        {/* Mentor Card (Centered & Proportionate) */}
        <div className="mt-12 mx-auto max-w-[340px] flex justify-center">
          {MENTORS.map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <MemberCard member={mentor} featured />
            </motion.div>
          ))}
        </div>

        {/* ================================================================
            TEAM STATS / CREDIBILITY BANNER
        ================================================================ */}
        <div className="mt-18 sm:mt-20 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/60 dark:via-zinc-900 dark:to-zinc-900/60 p-6 sm:p-8 shadow-sm backdrop-blur-md max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                01
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                IT Mentor
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-400">
                01
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Team Leader
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-400">
                01
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Sub-Leader
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                04
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Junior Devs
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            SECTION 2: OUR TEAM (2 Cards Per Row, Compact Width)
        ================================================================ */}
        <div className="mt-18 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-light shadow-xs backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Group 2 Engineers</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
            The 6 passionate engineers transforming requirements into clean code, interactive interfaces, and robust digital systems.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                  : "border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>All Members ({ALL_STUDENTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leaders")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "leaders"
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 scale-105"
                  : "border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Leaders ({TEAM_LEADERS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("members")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "members"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
                  : "border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Junior Devs ({TEAM_MEMBERS.length})</span>
            </button>
          </div>
        </div>

        {/* Team Members Grid: 2 Cards Per Row, Centered and Sleek */}
        <motion.div
          layout
          className="mt-12 max-w-2xl lg:max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="w-full max-w-[330px] sm:max-w-[340px]"
              >
                <MemberCard member={member} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
