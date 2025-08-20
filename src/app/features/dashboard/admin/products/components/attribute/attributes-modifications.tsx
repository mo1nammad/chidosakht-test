import React from "react";
import { AnimatePresence } from "framer-motion";

import AttributesModificationsSelect from "./attributes-modifications-select";
import AttributesModificationsColor from "./attributes-modifications-color";
import { useGetAttributes } from "../../api/attribute/use-get-attributes";
import { selectAttribute } from "../../types";

export default function AttributeModifications() {
  const { data: productAttributes, status } = useGetAttributes();

  if (status === "success")
    return (
      <div
        dir="rtl"
        className="my-6 grid grid-cols-1 sm:grid-cols-3 grid-flow-row-dense gap-y-6"
      >
        <AnimatePresence>
          {productAttributes.map((attribute) =>
            attribute.attributeType === selectAttribute ? (
              <AttributesModificationsSelect
                key={attribute.productAttributeId}
                attribute={attribute}
              />
            ) : (
              <AttributesModificationsColor
                key={attribute.productAttributeId}
                attribute={attribute}
              />
            )
          )}
        </AnimatePresence>
      </div>
    );
}
