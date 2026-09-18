import React from "react";
import DataTable from "@/components/data-table/DataTable";

export default function DataTablePage() {
  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Table</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Search, Sort, Filter, and Pagination
        </p>
      </div>

      <DataTable />
    </main>
  );
}
