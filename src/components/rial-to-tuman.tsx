import { convertRialToTuman } from "@/lib/utils";
import React from "react";

type AppProps = {
  price: number;
  className?: string;
  skipSlice?: boolean;
};
export default function RialToTuman({ price, className, skipSlice }: AppProps) {
  const tuman = convertRialToTuman(price, skipSlice);

  return (
    <div className={className}>
      {tuman.reverse().map((value, index) => (
        <span key={value + index}>{value}</span>
      ))}{" "}
      <span>تومان</span>
    </div>
  );
}
