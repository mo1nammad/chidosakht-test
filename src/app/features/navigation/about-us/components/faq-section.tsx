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

const FAQSection = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Accordion
      type="single"
      value={value}
      onValueChange={(value) => setValue(value)}
      collapsible
      className="w-full md:max-w-[500px] text-right"
    >
      {accordionData.map((data) => (
        <AccordionItem key={data.value} value={data.value}>
          <AccordionTrigger
            className={cn(
              "flex-row-reverse",
              data.value === value && "text-primary"
            )}
          >
            {data.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {data.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQSection;
