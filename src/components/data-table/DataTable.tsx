"use client";

import React, { useState } from "react";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import Pagination from "./Pagination";

interface SampleItem {
  id: string;
  name: string;
  category: string;
  price: number;
  status: string;
}

const SAMPLE_ITEMS: SampleItem[] = [
  {
    id: "1",
    name: "iPhone 16 Pro",
    category: "Phone",
    price: 999,
    status: "In Stock",
  },
  {
    id: "2",
    name: 'MacBook Pro 16"',
    category: "Laptop",
    price: 2499,
    status: "In Stock",
  },
  {
    id: "3",
    name: "iPad Pro M4",
    category: "Tablet",
    price: 1299,
    status: "In Stock",
  },
];

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredItems = SAMPLE_ITEMS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "all" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <TableSearch value={search} onChange={setSearch} />
        <TableFilter
          value={filter}
          onChange={setFilter}
          options={[
            { label: "Phone", value: "Phone" },
            { label: "Laptop", value: "Laptop" },
            { label: "Tablet", value: "Tablet" },
          ]}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-secondary/50 dark:bg-zinc-800 text-xs font-semibold">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-zinc-500">{item.category}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={1} totalPages={1} />
    </div>
  );
}
