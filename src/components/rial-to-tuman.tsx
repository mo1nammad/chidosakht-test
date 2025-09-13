import { convertRialToTuman } from "@/lib/utils";
import React from "react";

type AppProps = {
  price: number;
  className?: string;
  skipSlice?: boolean;
  as?: React.ElementType;
};
export default function RialToTuman({
  price,
  className,
  skipSlice,
  as = "div",
}: AppProps) {
  const tuman = convertRialToTuman(price, skipSlice);
  const Component = as;
  return (
    <Component className={className}>
      {tuman.reverse().map((value, index) => (
        <span key={value + index}>{value}</span>
      ))}{" "}
      <span>تومان</span>
    </Component>
  );
}
