"use client";

import React, { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useVerifySignupOtp } from "../api/use-verify-signup-otp";
import { useHandleOtpRoute } from "../hooks/use-handle-otp-route";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CountDownTimer from "./countdown-timer";

type AppProps = {
  className?: string;
};

export default function SignupOtpForm({ className }: AppProps) {
  useHandleOtpRoute();
  const { verifyOtp } = useVerifySignupOtp();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [] = useState(new Date());

  const handleOtpForm = () =>
    verifyOtp(
      { otp: value },
      {
        onError: (err) => setError(err.message),
      }
    );

  return (
    <>
      {error ? <p className="text-destructive text-center">{error}</p> : null}
      <InputOTP
        containerClassName={className}
        maxLength={6}
        minLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        onComplete={handleOtpForm}
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
