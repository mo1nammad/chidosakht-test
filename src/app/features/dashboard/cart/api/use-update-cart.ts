import { useEffect } from "react";
import axiosInstance from "@/lib/axios";

const asynchronousCartUpdate = async (cartId: number) => {
  await axiosInstance.put(`/Cart/UpdatePricesInCartWithUserApproval/${cartId}`);
  await axiosInstance.put(
    `/Cart/UpdateNumberOfItemsWithUserApproval/${cartId}`
  );
};

/**
 * updates Cart infos every 30 secconds
 */
export const useUpdateCart = (cartId: number) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      asynchronousCartUpdate(cartId);
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  });
};
