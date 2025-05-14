import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export type CreateMenuRequest = {
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
};

interface CreateMenuProps {
  onClose: () => void;
  reset: () => void;
}

export default function useCreateMenuMutation({
  onClose,
  reset,
}: CreateMenuProps) {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateMenuRequest) => {
      const response = await api.post("/menu", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Menu berhasil ditambah!");
      queryClient.invalidateQueries({ queryKey: ["tenant-detail"] });
      reset();
      onClose();
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal menambah menu!");
    },
  });

  return { mutate, mutateAsync, isPending, data, isError };
}
