import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { AttributeValue } from "../types";
import { productAttributeValuesKey } from "./use-get-attribute-values";
type RequestBody = {
  productAttributeId: number;
  value: string;
};

// api call
const postAttributeValues = async (req: RequestBody) =>
  await axiosInstance.post("/Admin/ProductAttributeValue", req);

// react query hook
export default function useCreateAttributeValue(attributeName: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<string>,
    RequestBody,
    { previousValues: AttributeValue[] | undefined } //context
  >({
    mutationFn: postAttributeValues,
    onMutate: async (req) => {
      // create a fake attribute value
      const newAttributeValue: AttributeValue = {
        productAttributeValueId: Date.now(),
        value: req.value,
      };

      // cancel ongoing queries
      await queryClient.cancelQueries({
        queryKey: productAttributeValuesKey(req.productAttributeId),
      });

      // get snapshot from previous attributeValues
      const previousValues = queryClient.getQueryData<AttributeValue[]>(
        productAttributeValuesKey(req.productAttributeId)
      );

      // set newAttributeValue as optimistic ui
      queryClient.setQueryData<AttributeValue[]>(
        productAttributeValuesKey(req.productAttributeId),
        (old) => (old ? [...old, newAttributeValue] : [newAttributeValue])
      );

      return { previousValues };
    },
    onSuccess: () => {
      toast.success(
        `ارزش جدیدی برای شاخصه ${attributeName} با موفقیت اضافه شد`
      );
    },
    onError: (err, req, context) => {
      toast.error(err.response?.data);
      queryClient.setQueryData<AttributeValue[]>(
        productAttributeValuesKey(req.productAttributeId),
        context?.previousValues
      );
    },
    onSettled: (_data, _err, vrb) =>
      queryClient.invalidateQueries({
        queryKey: productAttributeValuesKey(vrb.productAttributeId),
      }),
  });

  return mutation;
}
