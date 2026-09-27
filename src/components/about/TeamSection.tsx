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
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================
            SECTION 1: OUR MENTOR (Teacher Sokcheat)
        ================================================================ */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#4F46E5] shadow-xs backdrop-blur-xs">
            <GraduationCap className="w-4 h-4 text-[#4F46E5]" />
            <span>Guidance & Advisory</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Our Mentor
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-[#64748B]">
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
            SECTION 2: OUR TEAM (2 Cards Per Row, Compact Width)
        ================================================================ */}
        <div className="mt-18 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xs backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Group 2 Engineers</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-[#64748B]">
            The 6 passionate engineers transforming requirements into clean code, interactive interfaces, and robust digital systems.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/25 hover:bg-[#4338CA] scale-105"
                  : "border border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>All Members ({ALL_STUDENTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leaders")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "leaders"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/25 hover:bg-[#4338CA] scale-105"
                  : "border border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Leaders ({TEAM_LEADERS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("members")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "members"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/25 hover:bg-[#4338CA] scale-105"
                  : "border border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
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
