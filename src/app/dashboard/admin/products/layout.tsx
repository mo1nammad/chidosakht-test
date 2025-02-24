import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10">{children}</div>
    </div>
  );
}
