import { Metadata } from "next";
import DetailTenant from "@/app/(home)/tenant/[id]/containers/DetailTenant";

export const metadata: Metadata = {
  title: "Detail Tenant",
  description: "Halaman Detail Tenant KantinKu",
};

export default function DetailTenantPage() {
  return <DetailTenant />;
}
