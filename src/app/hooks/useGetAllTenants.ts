import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function useGetAllTenants() {
  return useQuery({
    queryKey: ["tenants-all"],
    queryFn: async () => {
      const response = await api.get(`/tenant/`);
      return response.data;
    },
  });
}
