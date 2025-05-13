"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@/components/table/Table";
import THead from "@/components/table/THead";
import TBody from "@/components/table/TBody";
import Filter from "@/components/table/Filter";
import PaginationControl from "@/components/table/PaginationControl";
import Button from "@/components/buttons/Button";

interface Linkable {
  href?: string;
}

interface Antrian extends Linkable {
  id: number;
  pesanan: string;
  notes: string;
  pemesan: string;
  createdAt: string;
  status: boolean;
}

const defaultData: Antrian[] = [
  {
    id: 1,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 2,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 3,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 4,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 5,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 6,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 7,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 8,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 9,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 10,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 11,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
  {
    id: 12,
    pesanan: "Bakwan",
    notes: "bumbunya dipisah",
    pemesan: "warga",
    createdAt: "08-05-2025",
    status: true,
  },
];

export default function QueueTable() {
  const [data, setData] = React.useState<Antrian[]>(defaultData);
  const [params, setParams] = useState({ page: 1, size: 10 });

  const columns: ColumnDef<Antrian>[] = [
    {
      accessorKey: "id",
      header: "Nomor",
    },
    {
      accessorKey: "pesanan",
      header: "Pesanan",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
    {
      accessorKey: "pemesan",
      header: "Pemesan",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <Button
          size="base"
          className={
            row.original.status
              ? `bg-[#243E80] border-none text-white hover:bg-[#013880]`
              : `bg-zinc-100 border-none text-black hover:text-black hover:bg-zinc-100 cursor-not-allowed`
          }
          onClick={() => {
            if (row.original.status) {
              handleReserved(row.original.id);
            }
          }}
        >
          Selesai
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  function handleReserved(id: number) {
    setData((prevData) =>
      prevData.map((menu) =>
        menu.id === id ? { ...menu, status: false } : menu,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Filter
        className="w-full md:w-fit"
        table={table}
        placeholder="Cari menu"
      />

      <Table columns={columns} data={data}>
        <THead table={table} omitSort={true} />
        <TBody<Antrian> table={table} />
      </Table>

      <PaginationControl
        className="self-end"
        data={data}
        table={table}
        setParams={setParams}
      />
    </div>
  );
}
