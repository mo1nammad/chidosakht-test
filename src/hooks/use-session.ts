import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type Method = typeof client.api.auth.user.$get;
type ResponseType = InferResponseType<Method>;

export const useSession = () => {
  const { data, ...others } = useQuery<ResponseType["session"], Error>({
    queryKey: ["user-session"],
    queryFn: async () => {
      const response = await client.api.auth.user.$get();
      const data = await response.json();

      if (response.ok) {
        return data.session;
      }

      throw new Error(
        "error" in data ? (data.error as string) : "Something went wrong"
      );
    },
    staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes (reduce network requests)
    gcTime: 1000 * 60 * 10,
    retry: 2, // ✅ Retry 2 times on failure
    refetchOnWindowFocus: false, // ✅ Avoid unnecessary refetching when switching tabs
    refetchOnReconnect: true, // ✅ Refetch when internet reconnects
  });
  return { session: data, ...others };
};
