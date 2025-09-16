import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

import axiosInstance from "@/lib/axios";
import { Comment } from "../types";

type ApiResponse = {
  page: number;
  countInPage: number;
  countAllPages: number;
  countAllItems: number;
  comments: Comment[];
};

export function useComments() {
  const searchParams = useSearchParams();
  const queryObj = queryString.parse(searchParams.toString());

  delete queryObj.modal;

  const filteredQueries = queryString.stringify(queryObj);

  const query = useQuery<ApiResponse>({
    queryKey: ["admin-comments", filteredQueries],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/Comment?${filteredQueries}`
      );
      return response.data;
    },
  });

  return query;
}
