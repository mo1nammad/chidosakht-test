"use client";

import React, { useState } from "react";

import { useRoles } from "../api/use-roles";
import { useUserByRoles } from "../api/use-users-by-role";

import { Skeleton } from "@/components/ui/skeleton";

import CreateRoleInputDrawerDialog from "./create-role-input-drawer-dialog";
import RoleSelectList from "./role-select-list";
import DeleteRoleDrawerDialog from "./delete-role-drawer-dialog";
import PermissionCheckboxSection from "./permission-checkbox-section";
import AssignUserRole from "./assign-user-role";
// table
import { UsersDataTable } from "./users-data-table";
import { columns } from "./users-data-table-column";

export default function RoleSection() {
  const { data: roles, isLoading } = useRoles();
  const [roleId, setRoleId] = useState(roles?.[0]?.id || "");

  const { data: UsersByRole, status } = useUserByRoles(roleId);

  const selectedRole = roles?.find((role) => role.id === roleId);

  return (
    <>
      {" "}
      <div className="flex flex-col md:flex-row-reverse">
        <div className="mt-4.5 mb-12 md:mb-0 md:basis-108">
          <h5 className="">نقش های فعلی</h5>
          <div className="flex flex-row-reverse items-center gap-x-4.5 mt-3.5">
            <RoleSelectList
              roles={roles}
              isLoading={isLoading}
              roleId={roleId}
              setRoleId={setRoleId}
            />
            <div className="flex gap-x-2.5">
              {selectedRole && (
                <DeleteRoleDrawerDialog
                  title="آیا از حذف نقش مطمئن هستی؟"
                  description="این عملیات برگشت پذیر نخواهد بود"
                  selectedRole={selectedRole}
                  onDelete={() => setRoleId("")}
                />
              )}

              <CreateRoleInputDrawerDialog
                title="ایجاد نقش جدید"
                description="یک نقش جدید برای مدیریت کاربران و ادمین ها ایجاد کنید"
              />
            </div>
            {/* permissions */}
          </div>
          {roleId && <PermissionCheckboxSection roleId={roleId} />}
        </div>
        {roleId && <AssignUserRole roleId={roleId} />}
      </div>
      {/* users table section */}
      <section className="mt-24">
        {roleId && status === "success" ? (
          <UsersDataTable columns={columns(roleId)} data={UsersByRole!} />
        ) : roleId && status === "pending" ? (
          <Skeleton className="w-full h-60" />
        ) : null}
      </section>
    </>
  );
}
