import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { AttributeValue as AttributeOptions } from "../../types";

type ApiResponse = AttributeOptions[];

export const productAttributeValuesKey = (attributeId: number) =>
  ["admin-product-attribute-values", attributeId] as const;

export function useGetAttributeValues(attributeId: number) {
  const query = useQuery<ApiResponse>({
    queryKey: productAttributeValuesKey(attributeId),
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/ProductAttributeValue/${attributeId}`
      );
      return response.data;
    },
  });

  return query;
}
