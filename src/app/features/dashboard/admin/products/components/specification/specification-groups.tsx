import React from "react";
import { useGetGroupAndSpec } from "../../api/specification/use-get-group-and-spec";
import SpecField from "./spec-field";
import SpecFieldForm from "./spec-field-form";
import SpecGroupHeader from "./spec-group-header";

export default function SpecificationGroups() {
  const { data, status } = useGetGroupAndSpec();
  console.log(data);

  if (status === "success")
    return (
      <div className="flex flex-col items-end gap-y-6">
        {data.map((group) => (
          <div key={group.id} className="w-full">
            <SpecGroupHeader group={group} />
            <div className="w-full grid grid-cols-4 grid-flow-row gap-5 p-4 bg-background rounded-md border border-gray-200">
              {group.specifications.map((field) => (
                <SpecField key={field.id} field={field} />
              ))}

              <SpecFieldForm groupId={group.id} className="col-span-full" />
            </div>
          </div>
        ))}
      </div>
    );
}
