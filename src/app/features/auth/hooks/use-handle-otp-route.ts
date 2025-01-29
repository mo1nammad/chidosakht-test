import { useEffect } from "react";
import { invalidateOtpSession, getOtpSessionStatus } from "../server/actions";
import { useRouter } from "next/navigation";

export function useHandleOtpRoute() {
  const router = useRouter();
  useEffect(() => {
    const handleReload = () => {
      invalidateOtpSession();
    };

    window.addEventListener("beforeunload", handleReload);

    return () => {
      window.removeEventListener("beforeunload", handleReload);
      invalidateOtpSession(); // disable React strictmode to test
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
