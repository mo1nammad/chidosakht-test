import React from "react";
import { AnimatePresence } from "framer-motion";

import { useVariantsStore } from "../store/variants";
import VariantModificationsSelect from "./variant-modifications-select";

export default function VariantModifications() {
  const variants = useVariantsStore((state) => state.variants);
  console.log(variants);

  return (
    <div
      dir="rtl"
      className="mt-6 grid grid-cols-1 sm:grid-cols-3 grid-flow-row-dense gap-y-9 mb-45"
    >
      <AnimatePresence>
        {variants.map((variant) =>
          variant.type === "select" ? (
            <VariantModificationsSelect key={variant.id} variant={variant} />
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
