import { useMutation } from "@tanstack/react-query";
import { CheckoutRequest, OrderResponse } from "@/types/checkout/order";
import api from "@/lib/api";
import toast from "react-hot-toast";

export function useCheckoutMutation() {
  return useMutation({
    mutationFn: async (data: CheckoutRequest) => {
      const response = await api.post("/order/checkout", data);
      return response.data as OrderResponse;
    },
    onSuccess: () => {
      toast.success("Pesanan berhasil dibuat!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal membuat pesanan!");
    },
  });
}
