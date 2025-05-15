"use client";

import Layout from "@/layouts/Layout";
import Image from "next/image";
import MenuItem from "@/app/(home)/tenant/components/MenuItem";
import { usePathname } from "next/navigation";
import { useGetTenantByID } from "@/app/hooks/useGetTenantByID";
import { Menu } from "@/types/tenant/menu";
import LocationsModal from "@/components/maps/LocationsModal";
import { useState } from "react";
import DetailTenantSkeleton from "@/app/(home)/tenant/[id]/components/DetailTenantSkeleton";
import withAuth from "@/components/hoc/withAuth";
import CartFooter from "@/layouts/CartFooter";

export default withAuth(DetailTenant, "student");

function DetailTenant() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tenantData, isPending } = useGetTenantByID({ id: id! });

  const menus = tenantData?.menus || [];

  const locations = [
    {
      id: 1,
      name: tenantData?.nama_canteen,
      lat: parseFloat(tenantData?.latitude),
      lng: parseFloat(tenantData?.longitude),
      departement: tenantData?.departement,
    },
  ];

  if (isPending) {
    return <DetailTenantSkeleton />;
  }

  return (
    <>
      <Layout withNavbar withFooter>
        <div className="px-8 md:px-16 py-8 md:py-16 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src="/images/BackgroundHero.png"
              alt="Banner"
              width={100}
              height={100}
              className="w-full md:w-64 h-40 rounded-lg object-cover"
            />

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl font-bold">
                {tenantData?.nama_tenant}
              </h2>
              <div className="flex flex-col gap-2 text-md w-fit">
                <p>
                  📍
                  <span
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer hover:underline underline-offset-2 transition duration-300"
                  >
                    {tenantData?.nama_canteen}
                  </span>
                </p>
                <p>💰 40rb–100rb</p>
                <p>☎️ {tenantData?.nomor_telepon}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Daftar Menu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menus.map((item: Menu) => (
                <MenuItem
                  key={item.id}
                  menu={item}
                  tenantName={tenantData?.nama_tenant || ""}
                />
              ))}
            </div>
          </div>
        </div>
        <CartFooter />
      </Layout>
      <LocationsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        locations={locations}
        title={`Letak ${tenantData?.nama_canteen}`}
      />
    </>
  );
}
