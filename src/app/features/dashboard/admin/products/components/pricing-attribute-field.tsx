import React, { useEffect } from "react";

import { Attribute, AttributeValue, selectAttribute as SELECT } from "../types";

import AttributesColorList from "./attribute/attributes-color-list";
import AttributeOptions from "./attribute/attributes-options";

type AppProps = {
  attributeAndValues: Attribute & {
    values: AttributeValue[];
  };
  setAttrValuesList: (id: number) => void;
};

export default function PricingAttributeField({
  attributeAndValues,
  setAttrValuesList,
}: AppProps) {
  const [selectedValue, setSelectedValue] = React.useState<number>(
    attributeAndValues.values[0].productAttributeValueId
  );

  useEffect(() => {
    // update final attributeValueArray
    setAttrValuesList(selectedValue);
  }, [selectedValue, setAttrValuesList]);

  return attributeAndValues.attributeType === SELECT ? (
    <div className="flex items-center gap-x-3.5 mb-2">
      <h4 className="text-sm">{attributeAndValues.name}</h4>
      <AttributeOptions
        options={attributeAndValues.values}
        value={selectedValue.toString()}
        onChange={(id) => setSelectedValue(+id)}
      />
    </div>
  ) : (
    <div className="flex items-center mb-2">
      <div className="flex items-center sm:col-span-3 grow">
        <h4 className="text-sm">{attributeAndValues.name}</h4>
        <AttributesColorList
          className="items-center py-2.5 px-2"
          attributeOptions={attributeAndValues.values}
          selectedColor={selectedValue}
          setSelectedColor={setSelectedValue}
        />
      </div>
    </div>
  );
}
