import React from "react";
import { Session as User } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import AssignUserIdentity from "./assign-user-identity";

type AppProps = {
  users: User[] | undefined;

  onAssign: (user: User) => void;
};

export default function AssignUserList({
  users,

  onAssign,
}: AppProps) {
  return (
    <ScrollArea className="max-h-125 w-full p-3 flex flex-col">
      {users && users.length > 0 ? (
        users.map((user) => (
          <AssignUserIdentity key={user.id} onAssign={onAssign} user={user} />
        ))
      ) : (
        <p className="text-xs m-auto py-2.5">
          هیچ کاربری با چنین شماره ای وجود ندارد
        </p>
      )}
    </ScrollArea>
  );
}
