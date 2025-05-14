import React, { useState } from "react";
import { Search } from "lucide-react";

import { useUsers } from "../api/use-users";
import { useDebounce } from "@/hooks/use-debounced";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AssignUserList from "./assign-user-list";

export default function AssignUserRole() {
  const { data: users } = useUsers();
  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce(value, 400);
  const filteredUsers = users?.filter((user) =>
    user.phoneNumber.includes(debouncedValue)
  );

  return (
    <div className="mt-14 grow">
      <div className="flex gap-x-4.5">
        <Button className="h-9" variant={"outline"}>
          اختصاص دادن کاربر
        </Button>{" "}
        <div className="relative w-full h-fit">
          <Search className="absolute top-1/2 -translate-y-1/2 left-2 size-4 text-muted-foreground" />
          <Input
            dir="rtl"
            className="grow bg-background"
            placeholder="شماره موبایل را وارد کنید"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
          />

          {/* users list */}
          <AssignUserList users={filteredUsers} show={!!debouncedValue} />
        </div>
      </div>
    </div>
  );
}
