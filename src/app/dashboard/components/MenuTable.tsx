"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import Table from "@/components/table/Table";
import Button from "@/components/buttons/Button";
import { Plus } from "lucide-react";
import AddMenuModal from "./AddMenuModal";
import { Menu } from "@/types/tenant/menu";
import { useGetTenantByID } from "@/app/hooks/useGetTenantByID";
import useAuthStore from "@/app/stores/useAuthStore";
import ConfirmationModal from "@/components/form/ConfirmationModal";
import useDeleteMenuMutation from "@/app/hooks/useDeleteMenuMutation";
import MenuImageCell from "@/app/dashboard/components/MenuImageCell";

export default function MenuTable() {
  const { user } = useAuthStore();

  const { data: menuData, isPending } = useGetTenantByID({ id: user?.id! });

  const menus = menuData?.menus || [];

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>(undefined);

  const handleAddMenu = () => {
    setIsEditing(false);
    setSelectedMenu(undefined);
    setIsOpen(true);
  };

  const handleEdit = (menu: Menu) => {
    setIsEditing(true);
    setSelectedMenu(menu);
    setIsOpen(true);
  };

  const handleDelete = (menu: Menu) => {
    setIsConfirmModalOpen(true);
    setSelectedMenu(menu);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setSelectedMenu(undefined);
    setIsConfirmModalOpen(false);
  };

  const { mutate, isPending: isDeleting } = useDeleteMenuMutation({
    id: selectedMenu?.id!,
    onSuccess: handleCloseModal,
  });

  return (
    <div className="flex flex-col gap-4">
      <Table
        className="text-black"
        data={menus}
        isLoading={isPending}
        columns={getColumns(handleEdit, handleDelete)}
        extras={
          <>
            <Button
              onClick={handleAddMenu}
              className="flex w-full md:justify-self-end md:w-fit"
              leftIcon={Plus}
            >
              Tambah Menu
            </Button>
          </>
        }
        withFilter
        withPaginationControl
      />

      <AddMenuModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isEditing={isEditing}
        menuData={selectedMenu}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message="Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak dapat dibatalkan."
        onClose={() => setIsConfirmModalOpen(false)}
        onSubmit={mutate}
        isLoading={isDeleting}
        title="Konfirmasi Hapus"
      />
    </div>
  );
}

const getColumns = (
  handleEdit: (menu: Menu) => void,
  handleDelete: (menu: Menu) => void,
): ColumnDef<Menu>[] => [
  {
    accessorKey: "id",
    header: "Nomor",
    cell: (info) => info.row.index + 1,
  },
  {
    id: "image_url",
    header: "Foto",
    cell: ({ row }) => (
      <MenuImageCell
        menuId={row.original.id}
        imageUrl={row.original.image_url}
      />
    ),
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
    cell: ({ row }) => `Rp. ${row.original.harga.toLocaleString("id-ID")}`,
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
          onClick={() => handleDelete(row.original)}
        >
          Hapus
        </Button>
      </div>
    ),
  },
];
