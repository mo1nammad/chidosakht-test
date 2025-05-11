import React from "react";
import { usePermissions } from "../api/use-permissions";
import { Loader2 } from "lucide-react";

type AppProps = {
  className?: string;
};

export default function PermissionCheckboxField({}: AppProps) {
  const { data, isLoading } = usePermissions();
  console.log(data);

  return isLoading ? (
    <div>
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <div>PermissionCheckboxField</div>
  );
}
