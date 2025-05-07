import QueueTable from "../components/QueueTable";

export default function QueuePage() {
  return (
    <div className="px-6 md:px-12 py-16 flex flex-col gap-4 w-screen">
      <p className="text-xl font-semibold">Daftar Antrian</p>
      <QueueTable />
    </div>
  );
}
