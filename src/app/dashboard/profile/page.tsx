import { Metadata } from "next";
import DashboardProfile from "@/app/dashboard/containers/TenantProfile";

export const metadata: Metadata = {
  title: "Profil",
  description: "Profil Tenant KantinKu",
};

export default function TenantProfilePage() {
  return <DashboardProfile />;
}
