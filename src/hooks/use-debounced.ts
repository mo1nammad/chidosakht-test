import { useState, useEffect } from "react";

export function useDebounce<T>(
  defaultValue: T,
  milliSeconds?: number
): [T, React.Dispatch<React.SetStateAction<T>>, T] {
  const [hookValue, setHookValue] = useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(hookValue);
    }, milliSeconds ?? 400);

    return () => {
      clearTimeout(handler);
    };
  }, [hookValue, milliSeconds]);

  return [debouncedValue, setHookValue, hookValue];
}
