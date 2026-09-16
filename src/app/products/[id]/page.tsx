import React from "react";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { id } = await params;

  return (
    <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold tracking-tight">Product Detail</h1>
      <p className="text-zinc-500 mt-2">
        Product ID: <span className="font-mono">{id}</span>
      </p>
    </main>
  );
}
