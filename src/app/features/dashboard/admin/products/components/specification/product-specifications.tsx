import React from "react";

import CreateSpecGroup from "./create-spec-group";
import SpecificationGroups from "./specification-groups";

export default function ProductSpecifications() {
  return (
    <>
      <SpecificationGroups />

      {/* createGroup */}
      <CreateSpecGroup className="mt-6" />
    </>
  );
}
