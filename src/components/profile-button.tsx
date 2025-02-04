"use client";

import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

import { logoutSession } from "@/app/features/auth/server/actions";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "@/hooks/use-session";

export default function ProfileButton() {
  const { session } = useSession();

  const fallback = session?.name.slice(0, 2);
  console.log(fallback);

  return session ? (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarFallback>{fallback}</AvatarFallback>
          <AvatarImage src="/blank-profile-picture.png" alt="user avatar" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full h-full flex items-center justify-center gap-x-8">
          <Avatar className="w-16 h-16 cursor-pointer">
            <AvatarFallback className="text-lg">{fallback}</AvatarFallback>{" "}
            <AvatarImage src="/blank-profile-picture.png" alt="user avatar" />
          </Avatar>
          <div>
            <h6>{session.name}</h6>
            <p className="text-sm font-yekan-regular text-muted-foreground">
              {session.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse mt-4 gap-3">
          <Button onClick={logoutSession} variant="destructive" size="sm">
            خروج از حساب
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href={"/dashboard"}>داشبورد</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <Link
      href="/sign-up"
      className={cn(
        buttonVariants({
          variant: "outline",
        })
      )}
    >
      <LogIn className="size-5!" />
      <span>ورود | ثبت‌نام</span>
    </Link>
  );
}
