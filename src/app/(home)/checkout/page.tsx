"use client";
import OrderList from "./components/OrderList";
import TotalPayment from "./components/TotalPayment";
import CheckoutFooter from "./components/CheckoutFooter";
import { useState } from "react";
import { useForm } from "react-hook-form";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  note: string;
  imageUrl: string;
};

export default function CheckoutPage() {
  const methods = useForm({ mode: "onChange" });

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 1,
      name: "Nasi Goreng",
      price: 20000,
      quantity: 1,
      note: "",
      imageUrl: "/images/BackgroundHero.png",
    },
    {
      id: 2,
      name: "Mie Ayam",
      price: 15000,
      quantity: 2,
      note: "",
      imageUrl: "/images/BackgroundHero.png",
    },
    {
      id: 3,
      name: "Mie Ayam",
      price: 15000,
      quantity: 2,
      note: "",
      imageUrl: "/images/BackgroundHero.png",
    },
    {
      id: 4,
      name: "Mie Ayam",
      price: 15000,
      quantity: 2,
      note: "",
      imageUrl: "/images/BackgroundHero.png",
    },
  ]);

  const handleIncrement = (id: number) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: number) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNoteChange = (id: number, note: string) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item)),
    );
  };

  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto min-h-screen w-full max-w-[680px] pb-[120px]">
      <div className="flex flex-col gap-6 px-5 pt-12 md:pt-16">
        {/* Pesanan */}
        <OrderList
          orders={orders}
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
