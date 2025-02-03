import React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useProtectOtpRoute } from "@/app/features/auth/hooks/use-handle-otp-route";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CountDownTimer from "./countdown-timer";

type AppProps = {
  className?: string;
  onComplete?: () => void;
  error?: string;

  value: string;
  onValueChange: (value: string) => void;
};

export default function OtpInput({
  className,
  onComplete,
  error,
  onValueChange,
  value,
}: AppProps) {
  useProtectOtpRoute();

  return (
    <>
      {error ? <p className="text-destructive text-center">{error}</p> : null}
      <InputOTP
        containerClassName={className}
        maxLength={6}
        minLength={6}
        value={value}
        onChange={onValueChange}
        onComplete={onComplete}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          <InputOTPSlot
            className="p-2 sm:ml-1.5 sm:rounded-xl! sm:p-6"
            index={0}
          />
          <InputOTPSlot
            className="p-2 sm:ml-1.5 sm:rounded-xl! sm:p-6"
            index={1}
          />
          <InputOTPSlot
            className="p-2 sm:ml-1.5 sm:rounded-xl! sm:p-6"
            index={2}
          />
          <InputOTPSlot
            className="p-2 sm:ml-1.5 sm:rounded-xl! sm:p-6"
            index={3}
          />
          <InputOTPSlot
            className="p-2 sm:ml-1.5 sm:rounded-xl! sm:p-6"
            index={4}
          />
          <InputOTPSlot
            className="p-2 sm:ml-1.5 sm:rounded-xl! sm:p-6"
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>

      <CountDownTimer />
    </>
  );
}
