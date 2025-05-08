import Button from "@/components/buttons/Button";
import Image from "next/image";
import { Menu } from "@/types/tenant/menu";

interface PopularMenuItemProps {
  menu: Menu;
}

const MenuItem = ({ menu }: PopularMenuItemProps) => {
  return (
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
        <Button
          size="base"
          className="bg-[#243E80] hover:bg-[#243E80] border-none hover:shadow-[#243E80] transition-all duration-300 py-2"
        >
          Tambah
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
