import { convertRialToTuman } from "@/lib/utils";
import React from "react";

type AppProps = {
  price: number;
  className?: string;
};
export default function RialToTuman({ price, className }: AppProps) {
  const tuman = convertRialToTuman(price);

  return (
    <div className={className}>
      {tuman.reverse().map((value, index) => (
        <span key={value + index}>{value}</span>
      ))}{" "}
      <span>تومان</span>
    </div>
  );
}
