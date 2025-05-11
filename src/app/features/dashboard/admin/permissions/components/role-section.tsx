"use client";

import React, { useState } from "react";

import { useRoles } from "../api/use-roles";
import { useCreateRole } from "../api/use-create-role";

import CreateRoleInputDrawerDialog from "./create-role-input-drawer-dialog";
import RoleSelectList from "./role-select-list";
import DeleteRoleDrawerDialog from "./delete-role-drawer-dialog";
import PermissionCheckboxSection from "./permission-checkbox-section";

export default function RoleSection() {
  const [roleId, setRoleId] = useState("");
  const { data: roles, isLoading } = useRoles();
  const { mutate: createRoleFn } = useCreateRole();

  const roleName = roles?.find((role) => role.id === roleId)?.name;

  return (
    <div className="mt-4.5">
      <h5 className="">نقش های فعلی</h5>
      <div className="flex flex-row-reverse items-center gap-x-4.5 mt-3.5">
        <RoleSelectList
          roles={roles}
          isLoading={isLoading}
          roleId={roleId}
          setRoleId={setRoleId}
        />
        <div className="flex gap-x-2.5">
          <DeleteRoleDrawerDialog
            roleId={roleId}
            title="آیا از حذف نقش مطمئن هستی؟"
            description="این عملیات برگشت پذیر نخواهد بود"
            roleName={roleName}
          />
          <CreateRoleInputDrawerDialog
            onUpdate={createRoleFn}
            title="ایجاد نقش جدید"
            description="یک نقش جدید برای مدیریت کاربران و ادمین ها ایجاد کنید"
          />
        </div>
        {/* permissions */}
      </div>
      {roleId && <PermissionCheckboxSection />}
    </div>
  );
}
