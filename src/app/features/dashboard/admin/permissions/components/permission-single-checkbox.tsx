import { Checkbox } from "@/components/ui/checkbox";
import { Permission } from "@/types";
import React from "react";

type AppProps = {
  permission: Permission;
  onUpdate: (id: number) => void;
  value: boolean;
};

export default function PermissionSingleCheckbox({
  onUpdate,
  permission,
  value,
}: AppProps) {
  return (
    <div className="flex items-center justify-end gap-x-1.5">
      <label htmlFor={String(permission.id)}>{permission.description}</label>
      <Checkbox
        id={String(permission.id)}
        checked={value}
        onCheckedChange={() => onUpdate(permission.id)}
      />
    </div>
  );
}
