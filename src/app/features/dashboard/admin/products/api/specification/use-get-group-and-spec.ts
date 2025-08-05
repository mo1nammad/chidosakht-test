import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";
import { SpecificationGroup, SpecificationField } from "../../types";

type ApiResponse = (SpecificationGroup & {
  specifications: SpecificationField[];
})[];

export const generateGroupAndSpecQueryKey = (productId: string | number) => [
  "admin-specifications-package",
  Number(productId),
];

export function useGetGroupAndSpec() {
  const { productId } = useParams();
  const query = useQuery<ApiResponse>({
    queryKey: generateGroupAndSpecQueryKey(productId as string),
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/ProductSpecificationGroupsAndSpecifications/${productId}`
      );
      return response.data;
    },
  });

  return query;
}
