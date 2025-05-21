import React, { memo, use } from "react";
import { Handle, Position } from "@xyflow/react";
import { CategoryContext } from "./category-context";
import { cn } from "@/lib/utils";

export default memo<{ data: { label: string }; id: string }>(
  function FlowCategoryNode({ data, id }) {
    const { categoryId, setCategoryId } = use(CategoryContext);

    return (
      <button
        onDoubleClick={() => setCategoryId(id)}
        className={cn(
          "bg-white border border-indigo-600 px-6 py-2 rounded-sm min-w-38 flex items-center justify-center transition-all cursor-grab",
          categoryId === id && "shadow-xl shadow-secondary bg-slate-100 outline"
        )}
      >
        <Handle type="target" position={Position.Left} />
        <p className="text-sm">{data.label}</p>
        <Handle type="source" position={Position.Right} />
      </button>
    );
  }
);
