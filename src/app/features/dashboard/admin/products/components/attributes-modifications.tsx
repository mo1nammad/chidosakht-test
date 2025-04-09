import React from "react";
import { AnimatePresence } from "framer-motion";

import { useAttributesStore } from "../store/attributes";
import AttributesModificationsSelect from "./attributes-modifications-select";
import AttributesModificationsColor from "./attributes-modifications-color";

export default function AttributeModifications() {
  const attributes = useAttributesStore((state) => state.attributes);

  return (
    <div
      dir="rtl"
      className="my-6 grid grid-cols-1 sm:grid-cols-3 grid-flow-row-dense gap-y-6"
    >
      <AnimatePresence>
        {attributes.map((attribute) =>
          attribute.type === "select" ? (
            <AttributesModificationsSelect
              key={attribute.id}
              attribute={attribute}
            />
          ) : (
            <AttributesModificationsColor
              key={attribute.id}
              attribute={attribute}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}
