import { useParams } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { generateGroupAndSpecQueryKey } from "./use-get-group-and-spec";
import { EditSpecificationSchemeType } from "../../scheme";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type RequestBody = EditSpecificationSchemeType;

export function useEditSpec() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    RequestBody
  >({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/ProductSpecification", req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateGroupAndSpecQueryKey(productId as string),
      });
    },
    onError: (err) => toast.error(err.response?.data.title),
  });

  return mutation;
}
