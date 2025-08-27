import React from "react";
import queryString from "query-string";
import { usePathname, useRouter } from "next/navigation";

export function useFilterQuery(_object: object) {
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const parsed = Object(queryString.parse(location.search));

    const object = { ...parsed, ..._object };

    const updatedUrl = queryString.stringifyUrl({
      url: pathname,
      query: object,
    });

    router.push(updatedUrl);
  }, [router, pathname, ...Object.values(_object)]);
}
