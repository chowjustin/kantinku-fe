import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const CartFooter = () => {
  const { totalItems, totalPrice, currentTenantName } = useCart();
  if (totalItems === 0) return null;

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
