import type { ReactNode } from "react";

import "./products.css";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="products-feature">
      <div className="products-content">{children}</div>
    </div>
  );
}
