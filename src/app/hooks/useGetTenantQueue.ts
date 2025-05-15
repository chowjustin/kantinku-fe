import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface useGetTenantQueueProps {
  id: string;
}

export function useGetTenantQueue({ id }: useGetTenantQueueProps) {
  return useQuery({
    queryKey: ["tenant-queue", id],
    queryFn: async () => {
      const response = await api.get(`/tenant/${id}/queue`);
      return response.data.data;
    },
    enabled: !!id,
    refetchInterval: 15000, // Check every 15 seconds
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 3,
  });
}
