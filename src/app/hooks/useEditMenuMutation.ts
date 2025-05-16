import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateMenuRequest } from "@/types/tenant/menu";
import { CreateMenuRequest } from "@/app/hooks/useCreateMenuMutation";

interface EditMenuProps {
  onClose?: () => void;
  reset?: () => void;
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
      mutationFn: async (data: UpdateMenuRequest | CreateMenuRequest) => {
        if (data.image instanceof File) {
          const formData = new FormData();

          formData.append("image", data.image);

          return await api.patch(`/menu/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        return await api.patch(`/menu/${id}`, data);
      },
      onSuccess: () => {
        toast.success("Menu berhasil diupdate!");
        queryClient.invalidateQueries({ queryKey: ["tenant-detail"] });
        if (reset && onClose) {
          reset();
          onClose();
        }
      },
      onError: (err) => {
        toast.error(err?.message || "Gagal mengupdate menu!");
      },
    });

  return { mutate, mutateAsync, isPending, data, isError, isSuccess };
}
