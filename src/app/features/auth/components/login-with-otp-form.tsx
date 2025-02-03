"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginWithOtpSchema } from "@/app/features/auth/schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useLoginWithOtp } from "@/app/features/auth/api/use-login-with-otp";

// component
export default function LoginForm() {
  const form = useForm<z.infer<typeof loginWithOtpSchema>>({
    resolver: zodResolver(loginWithOtpSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { mutate, status } = useLoginWithOtp();

  const onSubmit = (values: z.infer<typeof loginWithOtpSchema>) =>
    mutate(values);

  return (
    <div className="max-w-[400px] mx-auto h-full">
      <Card className="relative top-1/2 -translate-y-1/2 border-input">
        <CardHeader>
          <Link href="/" className="flex items-center justify-center gap-x-2">
            <h1 className="text-3xl font-black">چیدوساخت</h1>
            <img src="/logo.svg" alt="logo" />
          </Link>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-right mt-2 space-y-3"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-yekan-light">
                      <span className="text-destructive">*</span> شماره موبایل
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          className={"rounded-xl border-border pl-14"}
                          {...field}
                        />
                        <span className="grid place-content-center absolute inset-y-0 left-0 px-2 border border-input rounded-xl font-yekan-light text-muted-foreground">
                          +98
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-x-8 items-center">
                <Button className="flex-1 mt-2" disabled={status === "pending"}>
                  {status === "pending" ? (
                    <Loader className="animate-spin size-4" />
                  ) : (
                    "ورود"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
