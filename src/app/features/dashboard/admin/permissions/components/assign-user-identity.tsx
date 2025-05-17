import React from "react";

import { Session as User } from "@/types";

type AppProps = {
  user: User;
  onAssign: (user: User) => void;
};
export default function AssignUserIdentity({ user, onAssign }: AppProps) {
  return (
    <button
      key={user.id}
      className="flex justify-between hover:bg-muted gap-y-3.5 rounded-lg p-3 cursor-pointer w-full"
      onClick={() => onAssign(user)}
    >
      <div className="text-left">{user.fullName}</div>
      <div className="flex flex-col text-right">
        <span>{user.phoneNumber}</span>
        <span className="text-sm">{user.email ?? "بدون ایمیل"}</span>
      </div>
    </button>
  );
}
