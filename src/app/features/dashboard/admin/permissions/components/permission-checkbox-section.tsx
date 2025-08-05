import React from "react";

import { usePermissions } from "../api/use-permissions";

import { Loader2 } from "lucide-react";
import PermissionSingleCheckbox from "./permission-single-checkbox";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useUpdateCurrentRolePermission } from "../api/use-update-current-role-permission";
import { useRolePermissionState } from "../hooks/useRolePermissionState";

type AppProps = {
  roleId: string;
};

export default function PermissionCheckboxSection({ roleId }: AppProps) {
  // fetch permission list from database
  const { data: permissions, status: checkboxesStatus } = usePermissions();

  // update this the role permissions api
  const { mutate: updateRolePermissions, isPending: isUpdatePending } =
    useUpdateCurrentRolePermission();

  // state for editing permissions for the role
  const { addPermissionToRole, currentRolePermissions, selectAllCheckBox } =
    useRolePermissionState(roleId);

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
              onUpdate={addPermissionToRole}
              value={currentRolePermissions.has(permission.id)}
            />
          ))}
        </div>
      </ScrollArea>
      <Button
        onClick={() => selectAllCheckBox(permissions)}
        variant="tertiary"
        size={"sm"}
        className="mr-3"
      >
        انتخاب همه
      </Button>

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
