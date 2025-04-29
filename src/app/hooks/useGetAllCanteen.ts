import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function useGetAllCanteen() {
  return useQuery({
    queryKey: ["canteen-all"],
    queryFn: async () => {
      const response = await api.get(`/canteen/all`);
      return response.data.data;
    },
  });
}
