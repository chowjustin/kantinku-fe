import Button from "@/components/buttons/Button";
import Image from "next/image";

interface PopularMenuItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const PopularMenuItem = ({
  name,
  price,
  image,
  description,
}: PopularMenuItemProps) => {
  return (
    <div className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start gap-4 w-full">
      <div className="flex flex-col gap-2 justify-between h-full">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl">{name}</h4>
          <p className="text-md font-medium text-gray-700 max-w-[200px]">
            {description}
          </p>
        </div>
        <p className="text-xl font-semibold">
          Rp{price.toLocaleString("id-ID")}
        </p>
      </div>
      <div className="w-full md:w-32 flex flex-col gap-4">
        <Image
          src={image}
          alt={name}
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

export default PopularMenuItem;
