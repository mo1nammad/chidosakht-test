import React, { useState } from "react";
import { Search, X } from "lucide-react";

import { useUsers } from "../api/use-users";
import { useDebounce } from "@/hooks/use-debounced";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AssignUserList from "./assign-user-list";
import { Session as User } from "@/types";
import { Card } from "@/components/ui/card";
import { useAssignUserRole } from "../api/use-assign-role";

type AppProps = {
  roleId: string;
};

export default function AssignUserRole({ roleId }: AppProps) {
  const { data: users } = useUsers();
  const { mutate: assignUserFn, isPending } = useAssignUserRole();
  const [value, setValue] = useState<string>("");
  const [showList, setShowList] = useState(false);

  const debouncedValue = useDebounce({
    milliSeconds: 400,
    value,
    onUpdate: () => {},
  });

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
    <div className="mt-14 grow">
      <div className="flex gap-x-4.5">
        <Button
          disabled={!assignedUser || isPending}
          className="h-9"
          variant={"outline"}
          onClick={handleAssign}
        >
          اختصاص دادن کاربر
        </Button>

        {/* overlay for assignUserList component */}
        {showList && (
          <button
            onClick={() => setShowList(false)}
            className="absolute inset-0"
          />
        )}
        <div className="relative w-full h-fit">
          <Search className="absolute top-1/2 -translate-y-1/2 left-2 size-4 text-muted-foreground" />
          <Input
            dir="rtl"
            className="grow bg-background"
            placeholder="شماره موبایل را وارد کنید"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            onClick={() => setShowList(true)}
          />

          {/* users list */}
          <AssignUserList
            users={filteredUsers}
            show={showList}
            onAssign={(user) => {
              setAssignedUser(user);
              setShowList(false);
            }}
          />
        </div>
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
            <Card className="flex justify-between gap-y-3.5 rounded-lg p-3 grow">
              <div className="text-left flex flex-col">
                <span>{assignedUser.fullName}</span>
              </div>
              <div className="flex flex-col text-right">
                <span>{assignedUser.phoneNumber}</span>
                <span className="text-sm">
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
