import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export type CreateCanteenRequest = {
  nama: string;
  departement: string;
  lat: number;
  lng: number;
};

export type CanteenResponse = {
  status: boolean;
  message: string;
  data: {
    id: string;
    nama: string;
    latitude: string;
    longitude: string;
  };
  meta: null;
};

export default function useCreateCanteenMutation() {
  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateCanteenRequest) => {
      const response = await api.post<CanteenResponse>("/canteen", data);
      return response.data;
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal membuat kantin!");
    },
  });

  return { mutate, mutateAsync, isPending, data, isError };
}
