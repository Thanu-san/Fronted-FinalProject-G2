"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_STORAGE_KEY = "shopnow-cart";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  stockQuantity?: number;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isReady: boolean;
  addItem: (product: CartProduct, quantity?: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItem: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  // localStorage exists only in the browser, so it is read after the first render.
  useEffect(() => {
    let isMounted = true;

    const loadSavedCart = () => {
      try {
        const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart && isMounted) {
          setItems(JSON.parse(savedCart) as CartItem[]);
        }
      } catch {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    const timer = window.setTimeout(loadSavedCart, 0);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, []);

  // Do not overwrite an existing cart before it has been read from localStorage.
  useEffect(() => {
    if (isReady) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isReady]);

  const addItem = useCallback((product: CartProduct, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    if (!Number.isFinite(safeQuantity)) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      const limit = Math.max(0, product.stockQuantity ?? existingItem?.stockQuantity ?? Infinity);
      if (limit === 0) return currentItems.filter(item => item.id !== product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, ...product, stockQuantity: product.stockQuantity ?? item.stockQuantity, quantity: Math.min(limit, item.quantity + safeQuantity) }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: Math.min(limit, safeQuantity) }];
    });
  }, []);

  const increaseQuantity = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(item.stockQuantity ?? Infinity, item.quantity + 1) } : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.id !== productId) return [item];
        if (item.quantity === 1) return [];

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const value = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      subtotal,
      isReady,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
    };
  }, [
    addItem,
    decreaseQuantity,
    increaseQuantity,
    isReady,
    items,
    removeItem,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return cart;
}
