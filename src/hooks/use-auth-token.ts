import { TokenContext } from "@/components/auth-token-provider";
import { useContext } from "react";

export const useAuthToken = () => {
  const context = useContext(TokenContext);
  return context;
};
