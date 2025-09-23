import React, { useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { useUsers } from "../api/use-users";
import { useDebounce } from "@/hooks/use-debounced";
import { useAssignUserRole } from "../api/use-assign-role";
import { Session as User } from "@/types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AssignUserList from "./assign-user-list";
import { Card } from "@/components/ui/card";

type AppProps = {
  roleId: string;
};

export default function AssignUserRole({ roleId }: AppProps) {
  const { data: users } = useUsers();
  const { mutate: assignUserFn, isPending } = useAssignUserRole(roleId);

  const [showList, setShowList] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [debouncedValue, setValue] = useDebounce("");

  const [assignedUser, setAssignedUser] = useState<User | null>(null);

  const filteredUsers = users?.filter((user) =>
    user.phoneNumber.includes(debouncedValue)
  );

  const handleAssign = () => {
    if (!assignedUser) return;

    assignUserFn(
      {
        roleIds: [roleId],
        userId: assignedUser.id,
      },
      {
        onSuccess: () => setAssignedUser(null),
      }
    );
  };

  return (
    <div className="md:mt-14 grow">
      <div className="flex gap-x-4.5">
        <Button
          disabled={!assignedUser || isPending}
          className="h-9"
          variant={"outline"}
          onClick={handleAssign}
        >
          اختصاص دادن کاربر
        </Button>

        {/* Custom Overlay to close on outside click */}
        {showList && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowList(false)}
          />
        )}
        <Popover open={showList}>
          <PopoverTrigger asChild>
            <div
              className="relative w-full h-fit"
              onClick={() => inputRef.current?.focus()}
            >
              <Search className="absolute top-1/2 -translate-y-1/2 left-2 size-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                dir="rtl"
                className="grow bg-background relative z-20 text-xs sm:text-base"
                placeholder="شماره موبایل را وارد کنید"
                onChange={(ev) => setValue(ev.target.value)}
                onFocus={() => setShowList(true)}
              />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-fit md:min-w-106 p-1">
            <AssignUserList
              users={filteredUsers}
              onAssign={(user) => {
                setAssignedUser(user);
                setShowList(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {/* users list */}
      </div>

      {assignedUser ? (
        <div className="mt-6">
          <h3 className="font-semibold text-sm mb-1.5">کاربر منتخب</h3>
          <div className="flex">
            <button
              className="cursor-pointer active:text-muted-foreground"
              onClick={() => setAssignedUser(null)}
            >
              <X className="size-4 mr-3.5" />
            </button>
            <Card className="flex justify-between gap-y-3.5 rounded-lg p-3 grow overflow-x-auto">
              <div className="text-left flex flex-col">
                <p className="text-sm sm:text-base text-primary font-semibold">
                  {assignedUser.fullName}
                </p>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs sm:text-sm">
                  {assignedUser.phoneNumber}
                </span>
                <span className="text-xs sm:text-sm">
                  {assignedUser.email ?? "بدون ایمیل"}
                </span>
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
}
