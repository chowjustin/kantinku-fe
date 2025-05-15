import Button from "@/components/buttons/Button";
import Image from "next/image";
import { Menu } from "@/types/tenant/menu";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { Minus, Plus } from "lucide-react";
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

  const cartItem = items.find((item) => item.id === menu.id);
  const itemQuantity = cartItem?.quantity || 0;
  const isInCart = itemQuantity > 0;

  useEffect(() => {
    if (isInCart) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemQuantity, isInCart]);

  const handleAddToCart = () => {
    if (currentTenantId && currentTenantId !== tenantId) {
      setShowModal(true);
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
    updateQuantity(menu.id, "increment");
  };

  const handleDecrement = () => {
    if (itemQuantity === 1) {
      updateQuantity(menu.id, "decrement");
    } else {
      updateQuantity(menu.id, "decrement");
    }
  };

  return (
    <>
      <div className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start gap-4 w-full">
        <div className="flex flex-col gap-2 justify-between h-full">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-xl">{menu?.nama}</h4>
            <p className="text-md font-medium text-gray-700 max-w-[200px]">
              {menu?.deskripsi}
            </p>
          </div>
          <p className="text-xl font-semibold">
            Rp{menu?.harga.toLocaleString("id-ID")}
          </p>
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
              className={`quantity-control cart-controls-enter ${highlight ? "quantity-highlight" : ""}`}
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
                className="quantity-btn increment"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <Button
              size="base"
              className="bg-[#243E80] hover:bg-[#243E80] border-none hover:shadow-[#243E80] transition-all duration-300 py-2"
              onClick={handleAddToCart}
            >
              Tambah
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
