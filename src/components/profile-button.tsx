"use client";

import React from "react";

import { Session } from "@/app/features/auth/constant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { logoutSession } from "@/app/features/auth/server/actions";

type Props = {
  session: Session;
};

export default function ProfileButton({ session }: Props) {
  const fallback = session.name.slice(0, 2);
  console.log(fallback);

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full h-full flex items-center justify-center gap-x-8">
          <Avatar className="w-16 h-16 cursor-pointer">
            <AvatarFallback className="text-lg">{fallback}</AvatarFallback>
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
  );
}
