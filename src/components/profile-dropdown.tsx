"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/use-session";
import axiosInstance from "@/lib/axios";
import { removeAllToken } from "@/lib/cookie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuthToken } from "@/hooks/use-auth-token";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { session, isLoading } = useSession();
  const queryClient = useQueryClient();

  const { removeToken } = useAuthToken();

  const { mutate: logoutFn } = useMutation({
    mutationFn: async () => {
      await axiosInstance.get("/Account/Logout");
      await removeAllToken();
      removeToken();
    },
    onSuccess: async () => {
      router.push("/");
    },
    onSettled: () =>
      queryClient.removeQueries({
        queryKey: ["user-session"],
      }),
  });

  if (isLoading) {
    return <Loader2 className="animate-spin text-muted-foreground/60" />;
  }

  if (!session)
    return (
      <Link
        href="/sign-up"
        className={cn(
          buttonVariants({
            variant: "outline",
          })
        )}
      >
        <span>ورود | ثبت‌نام</span>
        <LogIn className="size-5!" />
      </Link>
    );

  const fallback = session?.fullName.slice(0, 2);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Avatar
          className={cn(
            "w-12 h-12 cursor-pointer",
            open && "ring-2 ring-primary"
          )}
        >
          <AvatarFallback>{fallback}</AvatarFallback>
          <AvatarImage src="/blank-profile-picture.png" alt="user avatar" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full h-full flex items-center justify-between">
          <Avatar className="w-16 h-16 cursor-pointer">
            <AvatarFallback className="text-lg">{fallback}</AvatarFallback>{" "}
            <AvatarImage src="/blank-profile-picture.png" alt="user avatar" />
          </Avatar>
          <div className="max-w-40">
            <h6 className="truncate">{session.fullName}</h6>
            <p className="text-sm font-yekan-regular text-muted-foreground truncate">
              {session.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse mt-4 gap-3">
          <Button onClick={() => logoutFn()} variant="destructive" size="sm">
            خروج از حساب
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href={"/dashboard"}>داشبورد</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
