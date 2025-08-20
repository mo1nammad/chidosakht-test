import React from "react";
import { columns } from "../components/variant/variants-column";

import { useGetAttributesAndValues } from "../api/attribute/use-get-both-attribute-value";
import { useParams } from "next/navigation";

export const useVariantColumn = () => {
  const { productId } = useParams();

  const [variantColumn, setVariantColumn] = React.useState(columns);

  // fetch attrValues
  const { data: attrValues } = useGetAttributesAndValues(productId as string);

  // add labels to columns
  React.useEffect(() => {
    const newColumnKeys: typeof columns = [];
    if (attrValues) {
      for (const attr of attrValues) {
        newColumnKeys.push({
          accessorKey: String(attr.productAttributeId),
          header: attr.name,
          cell: (props) => {
            const value = props.getValue() as string | undefined;
            const isColor =
              value?.includes("rgb(") || value?.includes("linear-gradient(");

            return isColor ? (
              <div className="w-full h-full flex flex-row-reverse">
                <span
                  className="w-full h-full min-h-3 max-w-8 rounded-md"
                  style={{
                    background: value,
                  }}
                ></span>
              </div>
            ) : value ? (
              value
            ) : (
              "وارد نشده"
            );
          },
        });
      }
    }

    setVariantColumn(() => [...columns, ...newColumnKeys]);
  }, [attrValues]);

  // change VariantsList type to a flatMapValues (eg. رنگ :‌ data)

  return variantColumn;
};
