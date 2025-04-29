import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type CreateTenantRequest = {
  nama: string;
  nama_tenant: string;
  nomor_telepon: string;
  email: string;
  password: string;
  canteen_id: string;
};

export default function useCreateTenantMutation() {
  const router = useRouter();

  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateTenantRequest) => {
      const response = await api.post("/tenant/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Pendaftaran tenant berhasil!");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal mendaftarkan tenant!");
    },
  });

  return { mutate, mutateAsync, isPending, data, isError };
}
