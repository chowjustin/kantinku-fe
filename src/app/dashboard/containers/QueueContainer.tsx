"use client";

import QueueTable from "@/app/dashboard/components/QueueTable";
import withAuth from "@/components/hoc/withAuth";

export default withAuth(QueueContainer, "tenant");

function QueueContainer() {
  return (
    <div className="px-6 md:px-12 py-16 flex flex-col gap-4">
      <p className="text-xl font-semibold">Daftar Antrian</p>
      <QueueTable />
    </div>
  );
}
