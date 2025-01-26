"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "@/app/features/auth/schema";

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
import { useSignUp } from "../api/use-signup";

// component
export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const { signUpFn } = useSignUp();

  const onSubmit = (values: z.infer<typeof signUpSchema>) => signUpFn(values);

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
          <div className="flex justify-between items-center">
            <Button asChild className="w-24 font-yekan-semibold">
              <Link href="/login">ورود</Link>
            </Button>

            <h3 className="text-lg font-yekan-semibold">عضویت</h3>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-right mt-2 space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-yekan-light">
                      <span className="text-destructive">*</span> نام
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"rounded-xl border-border"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-yekan-light">
                      ایمیل(اختیاری)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"rounded-xl border-border"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-yekan-light">
                      <span className="text-destructive">*</span> گذرواژه
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"rounded-xl border-border"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full py-6 font-yekan-semibold mt-2">
                عضویت
              </Button>
              <div className="text-[11px]">
                ورود شما به معنای پذیرش{" "}
                <Link href="/" className="text-primary hover:underline">
                  شرایط چیدوساخت{" "}
                </Link>
                و{" "}
                <Link href="/" className="text-primary hover:underline">
                  قوانین حریم‌خصوصی{" "}
                </Link>
                است
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
