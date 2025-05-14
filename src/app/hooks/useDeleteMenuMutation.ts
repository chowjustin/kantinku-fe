import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface useDeleteMenuProps {
  id: string;
  onSuccess?: () => void;
}

export default function useDeleteMenuMutation({
  id,
  onSuccess,
}: useDeleteMenuProps) {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, data, isError, isSuccess } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/menu/${id}`);
      },
      onSuccess: () => {
        toast.success("Menu berhasil dihapus!");
        queryClient.invalidateQueries({ queryKey: ["tenant-detail"] });
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (err) => {
        toast.error(err?.message || "Gagal menghapus menu!");
      },
    });

  return { mutate, mutateAsync, isPending, data, isError, isSuccess };
}
