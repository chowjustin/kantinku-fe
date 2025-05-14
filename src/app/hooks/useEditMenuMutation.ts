import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateUserRequest } from "@/types/user";

interface EditMenuProps {
  onClose: () => void;
  reset: () => void;
  id: string;
}

export default function useEditMenuMutation({
  id,
  onClose,
  reset,
}: EditMenuProps) {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, data, isError, isSuccess } =
    useMutation({
      mutationFn: async (data: UpdateUserRequest) => {
        return await api.patch(`/menu/${id}`, data);
      },
      onSuccess: () => {
        toast.success("Menu berhasil diupdate!");
        queryClient.invalidateQueries({ queryKey: ["tenant-detail"] });
        reset();
        onClose();
      },
      onError: (err) => {
        toast.error(err?.message || "Gagal mengupdate menu!");
      },
    });

  return { mutate, mutateAsync, isPending, data, isError, isSuccess };
}
