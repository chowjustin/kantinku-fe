"use client";
import OrderList from "./components/OrderList";
import TotalPayment from "./components/TotalPayment";
import CheckoutFooter from "./components/CheckoutFooter";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const methods = useForm({ mode: "onChange" });
  const { items, updateQuantity, removeFromCart, updateNote, totalPrice } =
    useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items.length, router]);

  const handleIncrement = (id: number | string) => {
    updateQuantity(id, "increment");
  };

  const handleDecrement = (id: number | string) => {
    updateQuantity(id, "decrement");
  };

  const handleDelete = (id: number | string) => {
    removeFromCart(id);
  };

  const handleNoteChange = (id: number | string, note: string) => {
    updateNote(id, note);
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[680px] pb-[120px]">
      <div className="flex flex-col gap-6 px-5 pt-12 md:pt-16">
        {/* Pesanan */}
        <OrderList
          orders={items}
          methods={methods}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
          onNoteChange={handleNoteChange}
        />

        {/* Total Pembayaran */}
        <TotalPayment total={totalPrice} />
      </div>

      {/* CTA Checkout */}
      <CheckoutFooter total={totalPrice} />
    </div>
  );
}
