import LoginContainer from "@/app/(auth)/login/containers/LoginContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Ulang",
  description: "Daftar Ulang dan Cetak Bukti Daftar Ulang",
};

export default function LoginPage() {
  return <LoginContainer />;
}
