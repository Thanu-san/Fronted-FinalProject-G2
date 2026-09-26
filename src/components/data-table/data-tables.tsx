"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { ColumnConfig, ProductTableRow } from "./columns";

interface DataTableProps<T extends Record<string, unknown>> {
  columns: ColumnConfig<T>[];
  data: T[];
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
}: DataTableProps<T>) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState<Record<string, boolean>>({});
  const pageSize = 12;

  const filteredData = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const pageData = filteredData.slice(
    (currentPageSafe - 1) * pageSize,
    currentPageSafe * pageSize,
  );

  const getRowId = React.useCallback((row: T, index: number) => {
    const possibleId = (row as Record<string, unknown>).uuid ?? (row as Record<string, unknown>).id;
    return String(possibleId ?? `${index}-row`);
  }, []);

  const toggleRowSelection = React.useCallback((rowId: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }, []);

  const handleRowClick = React.useCallback((row: T) => {
    const rowUuid = (row as Record<string, unknown>).uuid;
    if (typeof rowUuid === "string" && rowUuid.trim()) {
      router.push(`/products/${rowUuid}`);
    }
  }, [router]);

  const toggleAllVisibleRows = React.useCallback(() => {
    const visibleIds = pageData.map((row, index) => getRowId(row, index));
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedRows[id]);

    if (allSelected) {
      setSelectedRows((prev) => {
        const next = { ...prev };
        visibleIds.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      return;
    }

    setSelectedRows((prev) => {
      const next = { ...prev };
      visibleIds.forEach((id) => {
        next[id] = true;
      });
      return next;
    });
  }, [getRowId, pageData, selectedRows]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-100 p-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-600" />
          Product Overview
        </div>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm border-gray-300 bg-white placeholder:text-slate-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_12px_30px_rgba(79,70,229,0.06)]">
        <table className="min-w-full divide-y divide-indigo-100 text-left text-sm">
          <thead className="bg-linear-to-r from-indigo-50 via-violet-50 to-white">
            <tr>
              <th className="w-12 px-3 py-3.5 text-center font-semibold text-indigo-900">
                <input
                  type="checkbox"
                  checked={pageData.length > 0 && pageData.every((row, index) => !!selectedRows[getRowId(row, index)])}
                  onChange={toggleAllVisibleRows}
                  aria-label="Select all visible rows"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={String(column.accessorKey ?? column.header)}
                  className="px-4 py-3.5 font-semibold text-indigo-900"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100 bg-white">
            {pageData.length > 0 ? (
              pageData.map((row, rowIndex) => (
                <tr
                  key={String((row as unknown as ProductTableRow).uuid ?? rowIndex)}
                  className="cursor-pointer transition-colors hover:bg-indigo-50/70"
                  onClick={() => handleRowClick(row)}
                  onKeyDown={(event) => {
                    if ((event.key === "Enter" || event.key === " ") && (row as Record<string, unknown>).uuid) {
                      event.preventDefault();
                      handleRowClick(row);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open product ${String((row as Record<string, unknown>).name ?? "details")}`}
                >
                  <td className="w-12 px-3 py-3 text-center" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={!!selectedRows[getRowId(row, rowIndex)]}
                      onChange={() => toggleRowSelection(getRowId(row, rowIndex))}
                      aria-label={`Select row ${rowIndex + 1}`}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  {columns.map((column) => {
                    const value = column.accessorKey
                      ? row[column.accessorKey as keyof T]
                      : undefined;

                    const cellValue =
                      column.cell && column.accessorKey
                        ? column.cell({ row: row as T })
                        : value;

                    const isAvailability = column.accessorKey === "availability";
                    const isPrice = column.accessorKey === "price";

                    return (
                      <td
                        key={`${String(column.accessorKey ?? column.header)}-${rowIndex}`}
                        className={`px-4 py-3 ${isPrice ? "font-semibold text-red-600" : "text-slate-600"}`}
                      >
                        {column.accessorKey === "image" && typeof value === "string" ? (
                          <img
                            src={value}
                            alt="Product"
                            className="h-12 w-12 rounded-xl border border-indigo-100 object-cover shadow-sm"
                          />
                        ) : isAvailability && typeof cellValue === "string" ? (
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              cellValue === "In stock"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {cellValue}
                          </span>
                        ) : typeof cellValue === "string" || typeof cellValue === "number" ? (
                          isPrice ? <span className="text-red-600">{cellValue}</span> : cellValue
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-slate-50 px-4 py-3">
        <span className="text-sm font-medium text-slate-600">
          Page {currentPageSafe} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPageSafe === 1}
            className="border-gray-300 bg-gray-400 text-slate-700 hover:bg-gray-50"
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPageSafe === totalPages}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

