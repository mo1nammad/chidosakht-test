import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import { useResendOtp } from "../api/use-resend-otp";
import { Button } from "@/components/ui/button";

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(120);
  const isResendButtonDisabled = timeLeft !== 0;

  const { resendOtp, status } = useResendOtp();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div className="w-full flex justify-center items-center gap-x-10 mt-6">
      <Button
        onClick={() => resendOtp()}
        size={"sm"}
        disabled={isResendButtonDisabled || status === "pending"}
      >
        {status === "pending" ? (
          <Loader className="animate-spin size-4" />
        ) : (
          "درخواست دوباره کد"
        )}
      </Button>
      <span className="text-lg">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default CountDownTimer;
