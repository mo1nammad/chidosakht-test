import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(120);
  const isResendButtonDisabled = timeLeft !== 0;

  const handleResend = () => {};

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
      <div className="max-w-83">
        <Button
          onClick={handleResend}
          size={"sm"}
          disabled={isResendButtonDisabled || status === "pending"}
          className="w-full"
        >
          {status === "pending" ? (
            <Loader className="animate-spin size-4" />
          ) : (
            "درخواست دوباره کد"
          )}
        </Button>
      </div>

      <span className="text-lg">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default CountDownTimer;
