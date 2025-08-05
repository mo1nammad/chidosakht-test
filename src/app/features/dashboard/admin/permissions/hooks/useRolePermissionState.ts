import React from "react";
import { Permission } from "@/types";
import { useRolePermissions } from "../api/use-role-permissions";

export const useRolePermissionState = (roleId: string) => {
  // current role permissions
  const { data: currentPermissionsData } = useRolePermissions(roleId);

  const [currentRolePermissions, setCurrentRolePermissions] = React.useState<
    Set<number>
  >(new Set());

  const selectAllCheckBox = (permissionList: Permission[]) =>
    setCurrentRolePermissions((prev) => {
      const newSet = new Set(prev);
      // unCheck and check selectBoxes
      if (newSet.size === permissionList.length) {
        for (const permission of permissionList) {
          newSet.delete(permission.id);
        }
      } else {
        for (const permission of permissionList) {
          newSet.add(permission.id);
        }
      }

      return newSet;
    });

  const addPermissionToRole = (id: number) =>
    setCurrentRolePermissions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });

  React.useEffect(() => {
    const settenPermissions = new Set(currentPermissionsData);
    setCurrentRolePermissions(settenPermissions);
  }, [currentPermissionsData]);

  return { currentRolePermissions, selectAllCheckBox, addPermissionToRole };
};
