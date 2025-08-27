import { useState, useEffect } from "react";

type HookProps<Type> = {
  value: Type;
  milliSeconds?: number;
  onUpdate?: () => void;
};

export function useDebounce<T>({
  milliSeconds = 400,
  value,
  onUpdate,
}: HookProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      onUpdate?.();
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds, onUpdate]);

  return debouncedValue;
}
