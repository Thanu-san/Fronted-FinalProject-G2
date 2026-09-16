import React from "react";

interface TableSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function TableSearch({
  value = "",
  onChange,
  placeholder = "Search table...",
}: TableSearchProps) {
  return (
    <div className="w-full sm:w-72">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-zinc-800"
      />
    </div>
  );
}
