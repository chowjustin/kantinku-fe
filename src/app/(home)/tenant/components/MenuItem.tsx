import Button from "@/components/buttons/Button";
import Image from "next/image";
import { Menu } from "@/types/tenant/menu";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { AlertCircle, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/form/ConfirmationModal";

interface PopularMenuItemProps {
  menu: Menu;
  tenantName: string;
}

const MenuItem = ({ menu, tenantName }: PopularMenuItemProps) => {
  const { addToCart, items, updateQuantity, clearCart, currentTenantId } =
    useCart();
  const pathname = usePathname();
  const tenantId = pathname.split("/").pop();

  const [highlight, setHighlight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [stockWarning, setStockWarning] = useState(false);

  const cartItem = items.find((item) => item.id === menu.id);
  const itemQuantity = cartItem?.quantity || 0;
  const isInCart = itemQuantity > 0;

  const isStockLimited = menu.stok !== undefined && itemQuantity >= menu.stok;

  useEffect(() => {
    if (isInCart) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemQuantity, isInCart]);

  useEffect(() => {
    if (stockWarning) {
      const timer = setTimeout(() => setStockWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [stockWarning]);

  const handleAddToCart = () => {
    if (currentTenantId && currentTenantId !== tenantId) {
      setShowModal(true);
      return;
    }

    if (menu.stok !== undefined && itemQuantity >= menu.stok) {
      setStockWarning(true);
      return;
    }

    addToCart(menu, tenantId!, tenantName);
  };

  const handleConfirmNewTenant = () => {
    clearCart();
    addToCart(menu, tenantId!, tenantName);
    setShowModal(false);
  };

  const handleIncrement = () => {
    if (menu.stok !== undefined && itemQuantity >= menu.stok) {
      setStockWarning(true);
      return;
    }

    updateQuantity(menu.id, "increment");
  };

  const handleDecrement = () => {
    updateQuantity(menu.id, "decrement");
  };

  const availableStock =
    menu.stok !== undefined ? menu.stok - itemQuantity : null;

  return (
    <>
      <div className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start gap-4 w-full relative">
        {stockWarning && (
          <div className="absolute -top-2 right-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-md z-10">
            <AlertCircle size={14} />
            <span>Stok terbatas</span>
          </div>
        )}

        <div className="flex flex-col gap-2 justify-between h-full">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-xl">{menu?.nama}</h4>
            <p className="text-md font-medium text-gray-700 max-w-[200px]">
              {menu?.deskripsi}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">
              Rp{menu?.harga.toLocaleString("id-ID")}
            </p>
            {menu.stok !== undefined && (
              <p
                className={`text-sm  ${menu.stok === 0 && "text-red-500"} ${menu.stok < 10 && menu.stok > 0 ? "text-amber-600" : "text-gray-500"} ${itemQuantity === menu.stok && "text-red-500"}`}
              >
                Stok: {menu.stok}
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-32 flex flex-col gap-4">
          <Image
            src={menu?.image_url || "/images/BackgroundHero.png"}
            alt={menu?.nama}
            width={300}
            height={300}
            className="w-full md:w-32 h-32 object-cover rounded-xl"
          />

          {isInCart ? (
            <div
              className={`quantity-control cart-controls-enter ${highlight ? "quantity-highlight" : ""} relative`}
            >
              <button
                onClick={handleDecrement}
                className="quantity-btn decrement"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className="quantity-value">{itemQuantity}</span>

              <button
                onClick={handleIncrement}
                className={`quantity-btn increment ${isStockLimited ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Increase quantity"
                disabled={isStockLimited}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <Button
              size="base"
              className={`bg-[#243E80] hover:bg-[#243E80] border-none hover:shadow-[#243E80] transition-all duration-300 py-2 ${menu.stok === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleAddToCart}
              disabled={menu.stok === 0}
            >
              {menu.stok === 0 ? "Habis" : "Tambah"}
            </Button>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleConfirmNewTenant}
        message={`Anda sudah memiliki pesanan dari tenant lain. Apakah Anda ingin menghapus pesanan sebelumnya dan memesan dari ${tenantName}?`}
        title="Ganti Tenant"
        confirmText="Ya, Ganti"
        cancelText="Tidak"
      />
    </>
  );
};

export default MenuItem;
