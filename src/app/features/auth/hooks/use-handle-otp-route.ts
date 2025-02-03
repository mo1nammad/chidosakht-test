import { useEffect } from "react";
import { getOtpSessionStatus } from "../server/actions";
import { useRouter } from "next/navigation";
import { client } from "@/lib/rpc";

export function useProtectOtpRoute() {
  const router = useRouter();

  useEffect(() => {
    const handleReload = () => {
      client.api.auth.otp.eject.$get();
    };

    window.addEventListener("beforeunload", handleReload);

    return () => {
      window.removeEventListener("beforeunload", handleReload);
      client.api.auth.otp.eject.$get();
    };
  }, []);

  useEffect(() => {
    const handleSessionValidation = async () => {
      const valid = await getOtpSessionStatus();
      if (!valid) {
        router.refresh();
      }
    };
    handleSessionValidation();
  });
}
