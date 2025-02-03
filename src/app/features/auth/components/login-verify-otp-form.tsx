"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { useVerifyLoginOtp } from "@/app/features/auth/api/use-verify-login-otp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import OtpInput from "./otp-input";

export default function LoginVerifyOtpForm() {
  const { verifyOtp } = useVerifyLoginOtp();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleOtpForm = () => {
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
    <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-center h-full">
      <Card className="w-full max-w-120 py-6">
        <CardHeader>
          <Link href="/" className="flex items-center justify-center gap-x-2">
            <h1 className="text-3xl font-black">چیدوساخت</h1>
            <img src="/logo.svg" alt="logo" />
          </Link>
        </CardHeader>
        <CardContent className="w-fit mx-auto space-y-5">
          <h4 className="text-center">کد 6 رقمی به شماره تلفن شما ارسال شد</h4>
          <OtpInput
            className="justify-center"
            onComplete={handleOtpForm}
            error={error}
            value={value}
            onValueChange={(value) => setValue(value)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
