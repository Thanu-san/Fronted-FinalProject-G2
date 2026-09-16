import React from "react";

interface TableFilterProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
}

export default function TableFilter({
  value = "all",
  onChange,
  options = [],
}: TableFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="all">All</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
