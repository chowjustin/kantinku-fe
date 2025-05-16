import { Metadata } from "next";
import QueueContainer from "@/app/dashboard/containers/QueueContainer";

export const metadata: Metadata = {
  title: "Antrian",
  description: "Antrian Pesanan KantinKu",
};

export default function QueuePage() {
  return <QueueContainer />;
}
