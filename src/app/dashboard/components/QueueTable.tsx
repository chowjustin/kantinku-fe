"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Table from "@/components/table/Table";
import withAuth from "@/components/hoc/withAuth";
import useAuthStore from "@/app/stores/useAuthStore";
import { useGetTenantQueue } from "@/app/hooks/useGetTenantQueue";
import SelectInput from "@/components/form/SelectInput";
import api from "@/lib/api";
import { FormProvider, useForm } from "react-hook-form";
import ConfirmationModal from "@/components/form/ConfirmationModal";
import { formatDateToLocale } from "@/app/utils/dateUtils";

interface MenuItem {
  menu: string;
  quantity: number;
}

interface OrderData {
  orderId: number;
  pesanan: MenuItem[];
  pesananDisplay: string;
  notes: string;
  pemesan: string;
  createdAt: string;
  createdAtDisplay: string;
  order_status: string;
}

interface QueueItem {
  orderId: number;
  notes: string | null;
  createdAt: string;
  pemesan: string;
  pesanan: MenuItem[];
  order_status?: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  rejected: "bg-red-100 text-red-800",
};

const formatPesanan = (pesanan: MenuItem[] | undefined): string => {
  if (!pesanan || !Array.isArray(pesanan)) return "-";

  return pesanan.map((item) => `${item.menu} - ${item.quantity}`).join("\n");
};

export default withAuth(QueueTable, "tenant");

function QueueTable() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState({
    isOpen: false,
    orderId: null as number | null,
    newStatus: "",
    message: "",
  });

  const { data: queueData, isPending: isLoadingQueue } = useGetTenantQueue({
    id: user?.id!,
  });

  const orderData = React.useMemo(() => {
    if (!queueData || !Array.isArray(queueData)) return [];

    return queueData.map((order: QueueItem) => ({
      orderId: order.orderId,
      pesanan: order.pesanan,
      pesananDisplay: formatPesanan(order.pesanan),
      notes: order.notes || "-",
      pemesan: order.pemesan,
      createdAt: order.createdAt,
      createdAtDisplay: formatDateToLocale(order.createdAt),
      order_status: order.order_status || "pending",
    }));
  }, [queueData]);

  const methods = useForm();

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: number; status: string }) => {
      return await api.patch(`/order/${orderId}`, { order_status: status });
    },
    onSuccess: () => {
      toast.success("Status pesanan berhasil diupdate!");
      queryClient.invalidateQueries({ queryKey: ["tenant-queue", user?.id] });
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Gagal mengupdate status pesanan!");
    },
  });

  const openModal = (orderId: number, newStatus: string) => {
    const statusLabel =
      STATUS_OPTIONS.find((opt) => opt.value === newStatus)?.label || newStatus;

    setModalState({
      isOpen: true,
      orderId,
      newStatus,
      message: `Apakah Anda yakin ingin mengubah status pesanan #${orderId} menjadi ${statusLabel}?`,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      orderId: null,
      newStatus: "",
      message: "",
    });
  };

  const handleSubmitStatusChange = () => {
    const { orderId, newStatus } = modalState;
    if (orderId && newStatus) {
      updateStatusMutation.mutate({ orderId, status: newStatus });
    }
  };

  const columns = React.useMemo<ColumnDef<OrderData>[]>(
    () => [
      {
        accessorKey: "pesananDisplay",
        header: "Pesanan",
        cell: ({ row }) => (
          <div className="whitespace-pre-line">
            {row.original.pesananDisplay}
          </div>
        ),
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
        accessorKey: "createdAtDisplay",
        header: "Waktu Pesan",
      },
      {
        accessorKey: "order_status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.order_status;
          return (
            <div
              className={`px-2 py-1 rounded-md text-xs font-medium inline-block ${STATUS_COLORS[status] || "bg-gray-100"}`}
            >
              {STATUS_OPTIONS.find((opt) => opt.value === status)?.label ||
                status}
            </div>
          );
        },
      },
      {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
          <FormProvider {...methods}>
            <SelectInput
              id={`status-${row.original.orderId}`}
              label={null}
              placeholder="Ubah Status"
              isSearchable={false}
              options={STATUS_OPTIONS}
              containerClassName="w-fit mx-auto"
              onChange={(selectedOption: any) => {
                const newStatus = selectedOption?.value;
                if (newStatus && newStatus !== row.original.order_status) {
                  openModal(row.original.orderId, newStatus);
                }
              }}
              value={row.original.order_status}
              hideError={true}
            />
          </FormProvider>
        ),
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      {isLoadingQueue ? (
        <div className="text-center py-8">Memuat data pesanan...</div>
      ) : (
        <Table
          data={orderData}
          columns={columns}
          withFilter={true}
          withPaginationControl={true}
          withEntries={true}
          isLoading={isLoadingQueue}
          tableClassName="max-h-[calc(100vh-300px)]"
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        onClose={closeModal}
        onSubmit={handleSubmitStatusChange}
        isLoading={updateStatusMutation.isPending}
        title="Konfirmasi Perubahan Status"
        confirmText="Ya, Ubah Status"
        cancelText="Batal"
      />
    </div>
  );
}
