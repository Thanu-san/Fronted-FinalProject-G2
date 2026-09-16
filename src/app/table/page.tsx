"use client";

import React from "react";
import DataTable, { Column } from "@/components/table/DataTable";

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock";
}

const SAMPLE_PRODUCTS: ProductRow[] = [
  {
    id: "1",
    name: "iPhone 16 Pro",
    category: "iPhone",
    price: 999,
    stock: 24,
    status: "In Stock",
  },
  {
    id: "2",
    name: 'MacBook Pro 16"',
    category: "Mac",
    price: 2499,
    stock: 12,
    status: "In Stock",
  },
  {
    id: "3",
    name: "iPad Pro M4",
    category: "iPad",
    price: 1299,
    stock: 18,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Apple Watch Ultra 2",
    category: "Watch",
    price: 799,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "5",
    name: "AirPods Max",
    category: "AirPods",
    price: 549,
    stock: 20,
    status: "In Stock",
  },
  {
    id: "6",
    name: 'MacBook Air 15"',
    category: "Mac",
    price: 1299,
    stock: 30,
    status: "In Stock",
  },
  {
    id: "7",
    name: "Apple Watch Series 10",
    category: "Watch",
    price: 399,
    stock: 4,
    status: "Low Stock",
  },
];

const COLUMNS: Column<ProductRow>[] = [
  { key: "name", header: "Product Name", sortable: true },
  { key: "category", header: "Category", sortable: true },
  {
    key: "price",
    header: "Price",
    sortable: true,
    render: (item) => `$${item.price.toLocaleString()}`,
  },
  { key: "stock", header: "Stock", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (item) => (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          item.status === "In Stock"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        }`}
      >
        {item.status}
      </span>
    ),
  },
];

export default function TablePage() {
  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Products Data Table
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Task 5: Table UI with Search, Sort, Filter, and Pagination
        </p>
      </div>

      <DataTable
        data={SAMPLE_PRODUCTS}
        columns={COLUMNS}
        searchKey="name"
        filterKey="category"
        filterOptions={[
          { label: "iPhone", value: "iPhone" },
          { label: "Mac", value: "Mac" },
          { label: "iPad", value: "iPad" },
          { label: "Watch", value: "Watch" },
          { label: "AirPods", value: "AirPods" },
        ]}
        pageSize={5}
      />
    </main>
  );
}
