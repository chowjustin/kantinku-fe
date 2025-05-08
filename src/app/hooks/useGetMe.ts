import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { User } from "@/types/user";

interface useGetMeProps {
  isTenant: boolean;
}

export function useGetMe({ isTenant }: useGetMeProps) {
  return useQuery<User>({
    queryKey: ["user-me"],
    queryFn: async () => {
      const path = isTenant ? "/tenant/me" : "/user/me";
      const res = await api.get(path);
      return res.data.data;
    },
  });
}
