import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

export default memo<{ data: { label: string; id: string } }>(
  function FlowCategoryNode({ data }) {
    return (
      <div className="bg-white border border-indigo-600 px-6 py-2 rounded-sm min-w-38 flex items-center justify-center">
        <Handle type="target" position={Position.Top} />
        <p className="text-sm">{data.label}</p>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  }
);
