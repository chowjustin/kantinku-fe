import { Metadata } from "next";
import OrderDetailsContainer from "@/app/(home)/orders/[id]/containers/OrderDetail";

export const metadata: Metadata = {
  title: "Detail Order",
  description: "Halaman Detail Order KantinKu",
};

export default function OrderDetailPage() {
  return <OrderDetailsContainer />;
}
