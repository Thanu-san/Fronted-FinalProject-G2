"use client";

import React, { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  filterOptions?: { label: string; value: string }[];
  filterKey?: keyof T;
  pageSize?: number;
}

export function DataTable<T extends object>({
  data,
  columns,
  searchKey,
  filterOptions,
  filterKey,
  pageSize = 5,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Search & Filter
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemRecord = item as Record<string, unknown>;
      const matchesSearch = searchKey
        ? String(itemRecord[searchKey as string] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      const matchesFilter =
        filterKey && selectedFilter !== "all"
          ? String(itemRecord[filterKey as string] ?? "") === selectedFilter
          : true;

      return matchesSearch && matchesFilter;
    });
  }, [data, search, searchKey, selectedFilter, filterKey]);

  // 2. Sort
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const itemA = a as Record<string, unknown>;
      const itemB = b as Record<string, unknown>;
      const valA = itemA[sortColumn];
      const valB = itemB[sortColumn];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
      const strA = String(valA ?? "");
      const strB = String(valB ?? "");
      return sortDirection === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [filteredData, sortColumn, sortDirection]);

  // 3. Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(colKey);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {searchKey && (
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        {filterOptions && filterKey && (
          <div className="flex items-center gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-secondary/50 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 ${col.sortable ? "cursor-pointer select-none hover:text-primary" : ""}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && sortColumn === col.key && (
                      <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => {
                const itemRecord = item as Record<string, unknown>;
                return (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4">
                        {col.render
                          ? col.render(item)
                          : String(itemRecord[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-zinc-400"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2 text-xs text-zinc-500">
        <div>
          Showing {paginatedData.length} of {sortedData.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
