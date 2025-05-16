"use client";

import { Menu } from "@/types/tenant/menu";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: number | string;
  tenantId: string | number;
  tenantName: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
  imageUrl: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (
    item: Menu,
    tenantId: string | number,
    tenantName: string,
  ) => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (
    itemId: number | string,
    type: "increment" | "decrement",
  ) => void;
  updateNote: (itemId: number | string, note: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  currentTenantId: string | number | null;
  currentTenantName: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentTenantId, setCurrentTenantId] = useState<
    string | number | null
  >(null);
  const [currentTenantName, setCurrentTenantName] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);

        if (parsedCart.length > 0) {
          setCurrentTenantId(parsedCart[0].tenantId);
          setCurrentTenantName(parsedCart[0].tenantName);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));

    if (items.length > 0) {
      setCurrentTenantId(items[0].tenantId);
      setCurrentTenantName(items[0].tenantName);
    } else {
      setCurrentTenantId(null);
      setCurrentTenantName(null);
    }
  }, [items]);

  const addToCart = (
    menu: Menu,
    tenantId: string | number,
    tenantName: string,
  ) => {
    setItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === menu.id,
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            id: menu.id,
            tenantId,
            tenantName,
            name: menu.nama,
            price: menu.harga,
            quantity: 1,
            note: "",
            imageUrl: menu.image_url || "/images/BackgroundHero.png",
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId: number | string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (
    itemId: number | string,
    type: "increment" | "decrement",
  ) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity =
            type === "increment" ? item.quantity + 1 : item.quantity - 1;

          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          }
          return { ...item, quantity: 0 };
        }
        return item;
      });

      if (type === "decrement") {
        return updatedItems.filter((item) => item.quantity > 0);
      }

      return updatedItems;
    });
  };

  const updateNote = (itemId: number | string, note: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, note } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
    setCurrentTenantId(null);
    setCurrentTenantName(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNote,
        clearCart,
        totalItems,
        totalPrice,
        currentTenantId,
        currentTenantName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
