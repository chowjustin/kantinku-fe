import { Metadata } from "next";
import TenantMenu from "@/app/dashboard/containers/TenantMenu";

export const metadata: Metadata = {
  title: "Menu",
  description: "Manajemen Menu Tenant KantinKu",
};

export default function MenuPage() {
  return <TenantMenu />;
}
