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
import { toast } from "sonner";
import { Loader } from "lucide-react";

type AppProps = {
  className?: string;
};

export default function SignupOtpForm({ className }: AppProps) {
  useHandleOtpRoute();
  const { verifyOtp } = useVerifySignupOtp();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [] = useState(new Date());

  const handleOtpForm = async () => {
    setError("");
    const promise = verifyOtp(
      { otp: value },
      {
        onError: (err) => setError(err.message),
      }
    );
    toast.promise(promise, {
      loading: (
        <div className="flex gap-x-4 items-center">
          <p className="text-sm"> در حال پردازش</p>
          <Loader className="animate-spin size-4" />
        </div>
      ),
      success: (data) => {
        if ("message" in data) {
          return data.message;
        } else return "success";
      },
      error: (err: Error) => err.message,
      position: "top-center",
      className: "flex-row-reverse! gap-x-4!",
    });
  };

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
