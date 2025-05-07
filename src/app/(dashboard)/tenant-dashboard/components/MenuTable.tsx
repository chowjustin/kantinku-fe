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
import { Plus } from "lucide-react";
import AddMenuModal from "./AddMenuModal";

interface Linkable {
  href?: string;
}

interface Menu extends Linkable {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
}

const defaultData: Menu[] = [
  {
    id: 1,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 10000,
    stok: 90,
  },
  {
    id: 2,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 20000,
    stok: 80,
  },
  {
    id: 3,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 30000,
    stok: 70,
  },
  {
    id: 4,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 40000,
    stok: 60,
  },
  {
    id: 5,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 50000,
    stok: 50,
  },
  {
    id: 6,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 60000,
    stok: 40,
  },
  {
    id: 7,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 70000,
    stok: 30,
  },
  {
    id: 8,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 80000,
    stok: 20,
  },
  {
    id: 9,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 90000,
    stok: 10,
  },
  {
    id: 10,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 10000,
    stok: 90,
  },
  {
    id: 11,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 20000,
    stok: 80,
  },
  {
    id: 12,
    nama: "Bakwan",
    deskripsi: "makanan paling gacor",
    harga: 30000,
    stok: 70,
  },
];

export default function MenuTable() {
  const [data, setData] = React.useState<Menu[]>(defaultData);
  const [params, setParams] = useState({ page: 1, size: 10 });

  const columns: ColumnDef<Menu>[] = [
    {
      accessorKey: "id",
      header: "Nomor",
    },
    {
      accessorKey: "nama",
      header: "Nama Menu",
    },
    {
      accessorKey: "deskripsi",
      header: "Deskripsi",
    },
    {
      accessorKey: "harga",
      header: "Harga",
    },
    {
      accessorKey: "stok",
      header: "Stok",
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            className="bg-yellow-400 border-none text-white hover:bg-yellow-500"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            className="bg-red-500 border-none text-white hover:bg-red-600"
            onClick={() => handleDelete(row.original.id)}
          >
            Hapus
          </Button>
        </div>
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

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: 0,
    stok: 0,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "harga" || name === "stok" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    const newMenu: Menu = {
      id: data.length + 1,
      ...formData,
    };
    setData((prev) => [...prev, newMenu]);
    closeModal();
    setFormData({ nama: "", deskripsi: "", harga: 0, stok: 0 });
  }

  function handleEdit(menu: Menu) {
    setFormData(menu);
    setIsOpen(true);
  }

  function handleDelete(id: number) {
    setData((prev) => prev.filter((menu) => menu.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse md:flex-row gap-4 justify-between">
        <Filter
          className="w-full md:w-fit"
          table={table}
          placeholder="Cari menu"
        />

        <Button
          onClick={openModal}
          className="flex w-full md:justify-self-end md:w-fit"
        >
          <Plus className="w-5 h-5" />
          Tambah Menu
        </Button>
      </div>

      <Table columns={columns} data={data}>
        <THead table={table} omitSort={true} />
        <TBody<Menu> table={table} />
      </Table>

      <PaginationControl
        className="self-end"
        data={data}
        table={table}
        setParams={setParams}
      />

      <AddMenuModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
