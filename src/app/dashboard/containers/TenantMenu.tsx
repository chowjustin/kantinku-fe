"use client";
import withAuth from "@/components/hoc/withAuth";
import MenuTable from "@/app/dashboard/components/MenuTable";

export default withAuth(TenantMenu, "tenant");

function TenantMenu() {
  return (
    <div className="px-6 md:px-12 py-16 flex flex-col gap-4">
      <p className="text-xl font-semibold">Daftar Menu Tenant</p>
      <MenuTable />
    </div>
  );
}
