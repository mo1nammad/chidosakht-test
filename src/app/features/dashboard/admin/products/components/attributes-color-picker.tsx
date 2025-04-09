import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

type AppProps = {
  onUpdate: (val: string) => void;
};

export default function AttributeColorPicker({ onUpdate }: AppProps) {
  const [color, setColor] = useState("rgba(255,255,255,1)");

  return (
    <div className="bg-[#202020]">
      <ColorPicker
        value={color}
        onChange={setColor}
        className="min-w-fit rounded-md p-3.5 font-sans"
        hidePresets
        hideColorGuide
        hideAdvancedSliders
      />
      <Button onClick={() => onUpdate(color)} className="w-full rounded-none">
        ثبت
      </Button>
    </div>
  );
}
