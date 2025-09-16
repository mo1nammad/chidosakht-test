import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import axiosInstance from "@/lib/axios";
import { Comment } from "@/types";

type ApiResponse = {
  page: number;
  countInPage: number;
  countAllPages: number;
  countAllItems: number;
  comments: Comment[];
};

async function fetchComments({
  pageParam,
  productId,
}: {
  pageParam: number;
  productId: number;
}): Promise<{ comments: Comment[]; nextPage?: number }> {
  const response = await axiosInstance.get<ApiResponse>(
    `/Comment?ProductId=${productId}&Page=${pageParam}&CountInPage=4`
  );
  return {
    comments: response.data.comments,
    nextPage:
      response.data.countAllPages > response.data.page
        ? pageParam + 1
        : undefined,
  };
}

export const useComments = () => {
  const { productId } = useParams();

  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }) =>
      fetchComments({ pageParam, productId: Number(productId) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
