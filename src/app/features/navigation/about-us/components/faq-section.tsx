"use client";
import { useState } from "react";

import { accordionData } from "@/app/features/navigation/about-us/constants";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type AppProps = {
  className?: string;
};

const FAQSection = ({ className }: AppProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Accordion
      type="single"
      value={value}
      onValueChange={(value) => setValue(value)}
      collapsible
      className={cn("w-full text-right", className)}
    >
      {accordionData.map((data) => (
        <AccordionItem key={data.value} value={data.value}>
          <AccordionTrigger
            className={cn(
              "flex-row-reverse text-right",
              data.value === value && "text-primary"
            )}
          >
            {data.question}
          </AccordionTrigger>
          <AccordionContent
            dir="rtl"
            className="text-muted-foreground text-right"
          >
            {data.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQSection;
