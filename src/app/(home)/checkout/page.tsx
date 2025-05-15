"use client";

import OrderList from "./components/OrderList";
import TotalPayment from "./components/TotalPayment";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Loader2,
  XCircle,
} from "lucide-react";
import { useCheckoutMutation, useOrderStatus } from "@/app/hooks/orderHooks";

export default function CheckoutPage() {
  const methods = useForm({ mode: "onChange" });
  const {
    items,
    updateQuantity,
    removeFromCart,
    updateNote,
    totalPrice,
    clearCart,
  } = useCart();
  const router = useRouter();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");

  // Use our custom checkout mutation hook
  const { mutate: checkout, isPending: isCheckoutLoading } =
    useCheckoutMutation();

  // Use our custom order status query hook
  const { data: orderData, isLoading: isStatusLoading } =
    useOrderStatus(orderId);

  // Update the payment status when order data changes
  useEffect(() => {
    if (orderData?.data) {
      setPaymentStatus(orderData.data.payment_status);

      // Check if payment is completed, then clear cart
      if (
        ["success", "settlement", "capture"].includes(
          orderData.data.payment_status.toLowerCase(),
        )
      ) {
        clearCart();
      }
    }
  }, [orderData, clearCart]);

  // Redirect if cart is empty and no order is in progress
  useEffect(() => {
    if (items.length === 0 && !orderId) {
      router.push("/");
    }
  }, [items.length, router, orderId]);

  // Handle the checkout process
  const handleCheckout = () => {
    // Format items for API
    const formattedItems = items.map((item) => ({
      menu_id: item.id.toString(),
      quantity: item.quantity,
    }));

    // Combine all notes into one string
    const combinedNotes = items
      .map((item) => item.note)
      .filter((note) => note && note.trim() !== "")
      .join(", ");

    // Call checkout mutation
    checkout(
      {
        items: formattedItems,
        notes: combinedNotes || "",
      },
      {
        onSuccess: (data) => {
          if (data.status && data.data) {
            setOrderId(data.data.token);
            setPaymentUrl(data.data.redirect_url);
            setPaymentStatus(data.data.payment_status);
          }
        },
      },
    );
  };

  // Redirect to payment page
  const handleRedirectToPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  // Item management handlers
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

  // Show loading state when cart is empty and no order exists
  if (items.length === 0 && !orderId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-[#243E80]" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[680px] pb-[120px]">
      <div className="flex flex-col gap-6 px-5 pt-12 md:pt-16">
        {/* Payment Status Section */}
        {orderId && (
          <div className="bg-white p-4 rounded-xl border">
            <div className="flex items-center gap-2 mb-4">
              {paymentStatus === "pending" ? (
                <AlertCircle className="text-yellow-500" />
              ) : ["success", "settlement", "capture"].includes(
                  paymentStatus,
                ) ? (
                <CheckCircle className="text-green-500" />
              ) : ["expire", "cancel", "deny", "failure"].includes(
                  paymentStatus,
                ) ? (
                <XCircle className="text-red-500" />
              ) : (
                <Loader2 className="text-blue-500 animate-spin" />
              )}
              <h3 className="font-semibold">
                Status Pembayaran:{" "}
                {paymentStatus &&
                  paymentStatus.charAt(0).toUpperCase() +
                    paymentStatus.slice(1)}
              </h3>
            </div>

            {paymentStatus === "pending" && (
              <>
                <p className="text-sm mb-4">
                  Silakan selesaikan pembayaran untuk memproses pesanan Anda.
                </p>
                <button
                  onClick={handleRedirectToPayment}
                  className="flex items-center justify-center gap-2 bg-[#243E80] text-white px-4 py-2 rounded-md hover:bg-[#1e3367] w-full"
                >
                  <span>Lanjutkan ke Halaman Pembayaran</span>
                  <ExternalLink size={16} />
                </button>
              </>
            )}

            {["success", "settlement", "capture"].includes(paymentStatus) && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800">
                Terima kasih! Pembayaran Anda telah berhasil diproses. Pesanan
                Anda sedang dipersiapkan.
              </div>
            )}

            {["expire", "cancel", "deny", "failure"].includes(
              paymentStatus,
            ) && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-800">
                Terjadi masalah dengan pembayaran Anda. Silakan coba lagi atau
                hubungi dukungan.
              </div>
            )}
          </div>
        )}

        {/* Order Details - Only show if no order has been created yet */}
        {!orderId && (
          <>
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
          </>
        )}
      </div>

      {/* Checkout Button - Only show if no order has been created yet */}
      {!orderId && (
        <div className="fixed bottom-0 md:bottom-5 p-4 md:p-0 left-0 right-0 z-30 mx-auto w-full">
          <div className="mx-auto flex items-center gap-4 w-full md:max-w-[640px] p-4 bg-zinc-100 rounded-xl">
            <div className="flex flex-col w-full">
              <p className="text-xl font-bold">
                Rp {totalPrice.toLocaleString()}
              </p>
              <p className="text-md font-medium">Total</p>
            </div>

            <button
              disabled={isCheckoutLoading}
              onClick={handleCheckout}
              className={`px-6 py-2 rounded-md text-white font-medium transition-all duration-200 ${
                isCheckoutLoading
                  ? "bg-gray-400"
                  : "bg-[#243E80] hover:bg-[#1e3367]"
              }`}
            >
              {isCheckoutLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </div>
              ) : (
                "Bayar"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
