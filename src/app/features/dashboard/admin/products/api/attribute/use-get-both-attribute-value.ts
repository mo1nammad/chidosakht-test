import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { AttributeValue as AttributeOptions, Attribute } from "../../types";

type ApiResponse = (Attribute & {
  values: AttributeOptions[];
})[];

export const attributeAndValuesKey = (productId: number) =>
  ["admin-attribute-and-value", productId] as const;

export function useGetAttributesAndValues(productId: number | string) {
  const query = useQuery<ApiResponse>({
    queryKey: attributeAndValuesKey(Number(productId)),
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/ProductAttributesAndValues/${productId}`
      );
      return response.data;
    },
  });

  return query;
}
