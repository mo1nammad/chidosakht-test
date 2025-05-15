import { useState, useEffect } from "react";

type HookProps = {
  value: string;
  milliSeconds: number;
  onUpdate?: () => void;
};

export const useDebounce = ({ milliSeconds, value, onUpdate }: HookProps) => {
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
};
