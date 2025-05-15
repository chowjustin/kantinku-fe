import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Types
export type CheckoutItem = {
  menu_id: string;
  quantity: number;
};

export type CheckoutRequest = {
  items: CheckoutItem[];
  notes: string;
};

export type OrderResponse = {
  status: boolean;
  message: string;
  data: {
    id: number;
    user_id: string;
    tenant_id: string;
    order_status: string;
    payment_status: string;
    notes: string;
    estimasi: null | string;
    antrian: null | number;
    payment_status_updated_at: string;
    order_status_updated_at: string;
    created_at: string;
    token: string;
    redirect_url: string;
  };
  meta: null;
};

// Checkout mutation hook
export function useCheckoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CheckoutRequest) => {
      const response = await api.post("/order/checkout", data);
      return response.data as OrderResponse;
    },
    onSuccess: () => {
      toast.success("Pesanan berhasil dibuat!");
      // We don't invalidate the cart here as we need to wait for payment confirmation
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal membuat pesanan!");
    },
  });
}

// Order status query hook
export function useOrderStatus(orderId: string | null) {
  return useQuery({
    queryKey: ["order-status", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const response = await api.get(`/order/status/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
    refetchInterval: 5000, // Check every 5 seconds
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 3,
  });
}

// Order history query hook (bonus)
export function useOrderHistory() {
  return useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const response = await api.get("/order/history");
      return response.data;
    },
  });
}
