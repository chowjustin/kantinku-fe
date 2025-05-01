"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Canteen = {
  id: string;
  departement: string;
  nama: string;
};

const dummyCanteens = [
  {
    id: "1",
    departement: "Teknik Informatika",
    nama: "Kantin TC",
  },
  {
    id: "2",
    departement: "Teknik Elektro",
    nama: "Kantin Volt",
  },
  {
    id: "3",
    departement: "Teknik Mesin",
    nama: "Kantin Gear",
  },
  {
    id: "4",
    departement: "Teknik Sipil",
    nama: "Kantin Beton",
  },
];

const MenuContent = () => {
  const [canteens, setCanteens] = useState<Canteen[]>([]);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const response = await fetch("/canteen/all");
        const result = await response.json();

        if (result.status && result.data) {
          setCanteens(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch canteens:", error);
      }
    };

    fetchCanteens();
  }, []);

  return (
    <div className="px-12 justify-center flex flex-wrap gap-8">
      {/* {canteens.map((canteen) => ( */}
      {dummyCanteens.map((canteen) => (
        <div
          key={canteen.id}
          className="group cursor-pointer flex flex-col gap-4"
        >
          <div className="relative w-full h-[300px]">
            {/* Background Menu */}
            <Image
              src="/images/BackgroundMenu.png"
              alt="Background"
              width={100}
              height={100}
              className="w-full h-full"
            />

            {/* Menu Image */}
            <div className="w-[270px] h-[285px] absolute left-[9px] top-[9px] rounded-tl-[68px] rounded-tr-[32px] rounded-b-[70px] overflow-clip">
              <Image
                src="/images/BackgroundHero.png"
                alt="Menu Image"
                fill
                className="object-cover w-full h-full"
              />
            </div>

            {/* Menu Shadow */}
            <div className="group-hover:opacity-100 transition-all duration-300 opacity-0 w-[271px] h-[285px] bg-foreground/60 absolute left-[9px] top-[9px] rounded-tl-[68px] rounded-tr-[32px] rounded-b-[70px] overflow-clip">
              <div className="flex w-full h-full items-center justify-center">
                <Image
                  src="/icons/icon-play.svg"
                  alt="icon play"
                  height={60}
                  width={60}
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl text-center font-medium">{canteen.nama}</h4>
            <p className="text-lg text-center">{canteen.departement}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuContent;
