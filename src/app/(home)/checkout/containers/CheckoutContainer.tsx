"use client";

import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingBasket } from "lucide-react";
import withAuth from "@/components/hoc/withAuth";
import ButtonLink from "@/components/links/ButtonLink";
import Layout from "@/layouts/Layout";
import { useCheckoutMutation } from "@/app/hooks/useCheckoutMutation";
import { useOrderStatus } from "@/app/hooks/useGetOrderStatus";
import OrderList from "@/app/(home)/checkout/components/OrderList";
import TotalPayment from "@/app/(home)/checkout/components/TotalPayment";

export default withAuth(CheckoutContainer, "student");

function CheckoutContainer() {
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
  const [isEmpty, setIsEmpty] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate: checkout, isPending: isCheckoutLoading } =
    useCheckoutMutation();

  const { data: orderData } = useOrderStatus(orderId);

  useEffect(() => {
    if (orderData?.data) {
      setPaymentStatus(orderData.data.payment_status);

      if (
        ["success", "settlement", "capture"].includes(
          orderData.data.payment_status,
        )
      ) {
        clearCart();
        router.push(`/orders/${orderId}`);
      }
    }
  }, [orderData, clearCart, orderId, router]);

  useEffect(() => {
    if (items.length === 0 && !orderId) {
      setIsEmpty(true);
    }
  }, [items.length, orderId]);

  useEffect(() => {
    if (orderId) {
      localStorage.setItem("pendingOrderId", orderId);
    }
    if (paymentUrl) {
      localStorage.setItem("pendingPaymentUrl", paymentUrl);
    }

    return () => {
      if (isRedirecting) {
        localStorage.removeItem("pendingOrderId");
        localStorage.removeItem("pendingPaymentUrl");
      }
    };
  }, [orderId, paymentUrl, isRedirecting]);

  const handleCheckout = () => {
    const formattedItems = items.map((item) => ({
      menu_id: item.id.toString(),
      quantity: item.quantity,
    }));

    const combinedNotes = items
      .map((item) => item.note)
      .filter((note) => note && note.trim() !== "")
      .join(", ");

    checkout(
      {
        items: formattedItems,
        notes: combinedNotes || "",
      },
      {
        onSuccess: (data) => {
          if (data.status && data.data) {
            const newOrderId = data.data.id.toString();
            setOrderId(newOrderId);
            setPaymentUrl(data.data.redirect_url);
            setPaymentStatus(data.data.payment_status);

            setIsRedirecting(true);
            router.push(`/orders/${newOrderId}`);
          }
        },
      },
    );
  };

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

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl gap-4">
        <ShoppingBasket size={100} />
        Belum ada pesanan yang dipilih.
        <ButtonLink href="/" variant="primary">
          Kembali ke Beranda
        </ButtonLink>
      </div>
    );
  }

  return (
    <Layout withNavbar withFooter>
      <div className="mx-auto w-full pb-[120px]">
        <div className="flex flex-col gap-6 pt-12 md:pt-16 px-4 sm:px-6 md:px-8 lg:px-[5%]">
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

              <TotalPayment total={totalPrice} />
            </>
          )}
        </div>

        {!orderId && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 px-4 sm:px-6 md:px-8 lg:px-[5%]">
            <div className="mx-auto flex items-center justify-between">
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
    </Layout>
  );
}
