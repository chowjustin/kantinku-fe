"use client";

import Image from "next/image";
import Link from "next/link";
import useGetAllTenants from "@/app/hooks/useGetAllTenants";
import { Tenant } from "@/types/tenant/tenant";
import MenuContentSkeleton from "@/app/(home)/components/MenuContentSkeleton";

const MenuContent = () => {
  const { data, isLoading } = useGetAllTenants();

  const tenantData = data?.data || [];

  if (isLoading) {
    return <MenuContentSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4 md:gap-6 lg:gap-8">
        {/* {canteens.map((canteen) => ( */}
        {tenantData.map((tenant: Tenant) => (
          <Link key={tenant.id} href={`/tenant/${tenant.id}`}>
            <div
              key={tenant.id}
              className="group cursor-pointer flex mx-auto flex-col gap-3 max-w-[300px]"
            >
              <div className="relative w-full aspect-square">
                {/* Background Menu */}
                <Image
                  src={"/images/BackgroundMenu.png"}
                  alt="Background"
                  fill
                  className="object-contain"
                />

                {/* Menu Image */}
                <div className="absolute inset-0 m-[3%] rounded-tl-[25%] rounded-tr-[12%] rounded-b-[25%] overflow-hidden">
                  <Image
                    src={tenant.image_url || "/images/BackgroundHero.png"}
                    alt="Menu Image"
                    fill
                    className="object-fill"
                  />
                </div>

                {/* Menu Shadow */}
                <div className="group-hover:opacity-100 transition-all duration-300 opacity-0 absolute inset-0 m-[3%] bg-foreground/60 rounded-tl-[25%] rounded-tr-[12%] rounded-b-[25%] overflow-hidden">
                  <div className="flex w-full h-full items-center justify-center">
                    <div className="w-1/4 h-1/4 relative">
                      <Image
                        src="/icons/icon-play.svg"
                        alt="icon play"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 px-2">
                <h4 className="text-base sm:text-lg md:text-xl lg:text-xl text-center font-bold">
                  {tenant.nama_tenant}
                </h4>
                <p className="text-xs sm:text-sm md:text-base lg:text-md text-center font-medium text-gray-900">
                  {tenant.nama_kantin}
                </p>
                <p className="text-xs sm:text-sm text-center font-medium text-gray-700">
                  {tenant.departement}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuContent;
