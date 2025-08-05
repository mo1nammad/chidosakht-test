import React from "react";
import { SquarePen, Trash } from "lucide-react";

import { SpecificationGroup } from "../../types";
import { useDeleteSpecGroup } from "../../api/specification/use-delete-group";
import { useUpdateSpecGroup } from "../../api/specification/use-update-group";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AppProps = {
  group: SpecificationGroup;
};
export default function SpecGroupHeader({ group }: AppProps) {
  const [isEditHeader, setIsEditHeader] = React.useState(false);
  const [editValue, setEditValue] = React.useState(group.title);

  const { mutate: deleteGroup } = useDeleteSpecGroup();
  const { mutate: updateGroup } = useUpdateSpecGroup();

  const isEditValid = editValue && editValue !== group.title;

  const handleUpdate = () => {
    if (!isEditValid) {
      setIsEditHeader(false);
      return;
    }

    updateGroup({ productSpecificationGroupId: group.id, titile: editValue });
    setIsEditHeader(false);
  };

  return (
    <div className="flex flex-row-reverse justify-between items-center gap-x-3 mb-3">
      {isEditHeader ? (
        <div className="flex gap-x-2.5">
          <Button
            disabled={!editValue}
            className="h-8.5"
            variant="secondary"
            onClick={handleUpdate}
          >
            ثبت
          </Button>
          <Input
            className="bg-background max-w-64"
            placeholder="نام جدید گروه"
            dir="rtl"
            value={editValue}
            onChange={(ev) => setEditValue(ev.target.value)}
          />
        </div>
      ) : (
        <h1 className="text-lg font-yekan-semibold">{group.title}</h1>
      )}
      <div className="space-x-2.5">
        <Button
          onClick={() => deleteGroup(group.id)}
          size={"icon"}
          className="size-7"
          variant="ghost"
        >
          <Trash className="size-full" />
        </Button>
        <Button
          onClick={() => setIsEditHeader((prev) => !prev)}
          size={"icon"}
          className="size-7"
          variant="ghost"
        >
          <SquarePen className="size-full" />
        </Button>
      </div>
    </div>
  );
}
