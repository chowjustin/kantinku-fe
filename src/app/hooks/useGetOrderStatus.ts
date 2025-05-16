import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useOrderStatus(orderId: string | null) {
  return useQuery({
    queryKey: ["order-status", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const response = await api.get(`/order/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
    retry: 3,
  });
}
