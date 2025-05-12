import React, { useEffect, useState } from "react";

import { usePermissions } from "../api/use-permissions";

import { Loader2 } from "lucide-react";
import PermissionSingleCheckbox from "./permission-single-checkbox";
import { useRolePermissions } from "../api/use-role-permissions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useUpdateCurrentRolePermission } from "../api/use-update-current-role-permission";

type AppProps = {
  roleId: string;
};

export default function PermissionCheckboxSection({ roleId }: AppProps) {
  // static checkbox labels
  const { data: permissions, status: checkboxesStatus } = usePermissions();

  // current role permissions
  const { data: rolePermissions } = useRolePermissions(roleId);

  const [currentRolePermissions, setCurrentRolePermissions] = useState<
    Set<number>
  >(new Set());
  useEffect(() => {
    const settenPermissions = new Set(rolePermissions);
    setCurrentRolePermissions(settenPermissions);
  }, [rolePermissions]);

  const { mutate: updateRolePermissions, isPending: isUpdatePending } =
    useUpdateCurrentRolePermission();

  // checkbox render first
  if (checkboxesStatus === "pending")
    return (
      <div className="w-full relative mt-8">
        <Loader2 className="animate-spin absolute right-0" />
      </div>
    );

  return checkboxesStatus === "success" ? (
    <>
      <ScrollArea className="mt-8 w-full h-50">
        <div className="flex flex-col gap-y-1.5 mr-3.5">
          {permissions.map((permission) => (
            <PermissionSingleCheckbox
              permission={permission}
              key={permission.id}
              onUpdate={(id) => {
                setCurrentRolePermissions((prev) => {
                  const newSet = new Set(prev);
                  if (newSet.has(id)) newSet.delete(id);
                  else newSet.add(id);
                  return newSet;
                });
              }}
              value={currentRolePermissions.has(permission.id)}
            />
          ))}
        </div>
      </ScrollArea>
      <Button
        onClick={() =>
          updateRolePermissions({
            permissionIds: [...currentRolePermissions],
            roleId,
          })
        }
        className="mt-4 mr-3.5 w-[144px]"
        size="sm"
        disabled={isUpdatePending}
      >
        {isUpdatePending ? (
          <Loader2 className="animate-spin" />
        ) : (
          " ثبت دسترسی های جدید"
        )}
      </Button>
    </>
  ) : null;
}
