import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { AlertCircle, ExternalLink, ShoppingBag } from "lucide-react";
import { useOrderStatus } from "@/app/hooks/orderHooks";
import { useEffect, useState } from "react";

const CartFooter = () => {
  const { totalItems, totalPrice, currentTenantName } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  // Get order ID from localStorage on component mount
  useEffect(() => {
    const storedOrderId = localStorage.getItem("pendingOrderId");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }

    const storedPaymentUrl = localStorage.getItem("pendingPaymentUrl");
    if (storedPaymentUrl) {
      setPaymentUrl(storedPaymentUrl);
    }
  }, []);

  // Use the orderStatus hook to get payment status
  const { data: orderData } = useOrderStatus(orderId);
  const paymentStatus = orderData?.data?.payment_status || "pending";

  // Don't show footer if there are no items and no pending order
  if (
    totalItems === 0 &&
    (!orderId || ["success", "settlement", "capture"].includes(paymentStatus))
  ) {
    return null;
  }

  // Handle redirection to payment page
  const handleRedirectToPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  // If there's a pending payment, show the payment status
  if (orderId && paymentStatus === "pending") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-yellow-500" size={20} />
              <div>
                <p className="font-medium">Pembayaran Pending</p>
                <p className="text-sm text-gray-500">
                  Selesaikan pembayaran Anda
                </p>
              </div>
            </div>

            <button
              onClick={handleRedirectToPayment}
              className="flex items-center gap-1 bg-[#243E80] hover:bg-[#1a2d5e] text-white px-4 py-2 rounded-lg transition duration-300"
            >
              <span>Bayar Sekarang</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular cart footer
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#243E80] text-white p-2 rounded-full">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {totalItems} item{totalItems > 1 ? "s" : ""}
              {currentTenantName && (
                <span>
                  {" "}
                  dari <span className="font-medium">{currentTenantName}</span>
                </span>
              )}
            </p>
            <p className="font-bold">Rp{totalPrice.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <Link
          href="/checkout"
          className="bg-[#243E80] hover:bg-[#1a2d5e] text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;
