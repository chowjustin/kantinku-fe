import { Metadata } from "next";
import Register from "@/app/(auth)/register/containers/RegisterContainer";

export const metadata: Metadata = {
  title: "Register",
  description: "Halaman Register KantinKu",
};

export default function RegisterPage() {
  return <Register />;
}
