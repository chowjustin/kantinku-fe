import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateUserRequest } from "@/types/user";

interface useEditUserMutationProps {
  isTenant: boolean;
}

export default function useEditUserMutation({
  isTenant,
}: useEditUserMutationProps) {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, data, isError, isSuccess } =
    useMutation({
      mutationFn: async (data: UpdateUserRequest) => {
        const path = isTenant ? "/tenant/me" : "/user/me";
        return await api.patch(path, data);
      },
      onSuccess: () => {
        toast.success("Data berhasil diupdate!");
        queryClient.invalidateQueries({ queryKey: ["user-me"] });
      },
      onError: (err) => {
        toast.error(err?.message || "Gagal mengupdate data!");
      },
    });

  return { mutate, mutateAsync, isPending, data, isError, isSuccess };
}
