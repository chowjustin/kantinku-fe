import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface useGetUserByIDProps {
  id: string;
}

export function useGetTenantByID({ id }: useGetUserByIDProps) {
  return useQuery({
    queryKey: ["tenant-detail", id],
    queryFn: async () => {
      const response = await api.get(`/tenant/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}
