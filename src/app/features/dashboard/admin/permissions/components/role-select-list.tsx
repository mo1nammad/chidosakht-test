import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Role } from "@/types";
type AppProps = {
  roleId: string;
  setRoleId: (val: string) => void;
  roles: Role[] | undefined;
  isLoading: boolean;
};
export default function RoleSelectList({
  roleId,
  setRoleId,
  isLoading,
  roles,
}: AppProps) {
  return (
    <Select value={roleId} onValueChange={(roleId) => setRoleId(roleId)}>
      <SelectTrigger
        className={cn(
          "w-[180px] bg-white flex-row-reverse",
          !roleId && "text-xs"
        )}
      >
        {isLoading ? (
          <Loader2 className="animate-spin size-4 text-muted-foreground" />
        ) : (
          <SelectValue placeholder="نقش های موجود" />
        )}
      </SelectTrigger>
      <SelectContent>
        {roles && roles.length > 0 ? (
          <SelectGroup>
            {roles.map((role) => (
              <SelectItem
                key={role.id}
                value={role.id}
                className="flex-row-reverse pl-8 pr-2 [&>span]:right-0 [&>span]:left-2"
              >
                {role.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ) : (
          <div className="text-[0.675rem] flex items-center justify-center py-4 text-muted-foreground">
            نقشی برای انتخاب وجود ندارد
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
