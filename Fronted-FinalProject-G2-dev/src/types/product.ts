export interface ComputerSpec {
  processor: string | null;
  ram: string | null;
  storage: string | null;
  gpu: string | null;
  os: string | null;
  screenSize: string | null;
  battery: string | null;
}
export interface Category {
  uuid: string;
  name: string;
  description: string | null;
  media: unknown;
}
export interface Brand {
  uuid: string;
  name: string;
  description: string | null;
  brandLogo: string | null;
}
export interface Product {
  uuid: string;
  name: string;
  description: string | null;
  computerSpec: ComputerSpec | null;
  stockQuantity: number;
  priceOut: number;
  discount: number | null;
  thumbnail: string | null;
  // Validate image entries: only empty top-level arrays have been observed so far.
  images: unknown[] | null;
  color: { color: string; images: string[] | null }[] | null;
  filteredImage: unknown;
  warranty: string | null;
  availability: boolean;
  category: Category | null;
  brand: Brand | null;
}
export interface ProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ProductFilterValues {
  search: string;
  category: string;
  availability: string;
  maxPrice: number;
  sort: string;
}
