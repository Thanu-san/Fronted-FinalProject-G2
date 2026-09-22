export type ProductTableRow = {
  uuid: string;
  name: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  availability: string;
};

export type ColumnConfig<T> = {
  accessorKey?: keyof T;
  header: string;
  cell?: (props: { row: T }) => string | number | null | undefined;
};

export const columns: ColumnConfig<ProductTableRow>[] = [
  {
    accessorKey: "image",
    header: "Picture",
    cell: ({ row }) => (row.image ? "Image" : "-"),
  },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) =>
      typeof row.price === "number"
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.price)
        : "-",
  },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "stock", header: "Stock" },
  { accessorKey: "availability", header: "Availability" },
];

