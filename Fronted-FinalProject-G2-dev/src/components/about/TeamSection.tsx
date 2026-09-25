import React from "react";

const MEMBERS = ["Leader / Frontend Architect", "UI / UX Designer", "Developer", "QA Engineer"];

export default function TeamSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Group 2 Team Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {MEMBERS.map((role, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-16 w-16 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 mb-3">
              0{i + 1}
            </div>
            <h4 className="font-semibold text-sm">Member {i + 1}</h4>
            <p className="text-xs text-zinc-500 mt-1">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

