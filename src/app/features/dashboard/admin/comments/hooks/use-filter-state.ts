import { useDebounce } from "@/hooks/use-debounced";
import { useState } from "react";

export const useFilterState = <T>(defaultValue: T) => {
  const [input, setInput] = useState<T>(defaultValue);
  const debouncedValue = useDebounce({
    value: input,
  });

  return { input, setInput, debouncedValue };
};
