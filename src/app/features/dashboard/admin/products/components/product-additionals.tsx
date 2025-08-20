import React, { PropsWithChildren, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Product } from "../types";
import { cn } from "@/lib/utils";
import { createProductAdditonalFormsList as additionalsList } from "@/app/features/dashboard/constants";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const MotionWrapper = ({ children }: PropsWithChildren) => (
  <motion.div
    className="min-h-65 my-6 px-2"
    initial={{
      x: 50,
      opacity: 0,
    }}
    animate={{
      x: 0,
      opacity: 1,
    }}
    exit={{
      x: 50,
      opacity: 0,
    }}
  >
    {children}
  </motion.div>
);

type AppProps = {
  product: Product;
};

export default function ProductAdditionals({ product }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const formSearchParam = useSearchParams().get("form");

  useEffect(() => {
    for (const form of additionalsList) {
      if (form.productType.includes(product.productType)) {
        router.push(`${pathname}?form=${form.query}`);
        break;
      }
    }
  }, []);

  return (
    <>
      <ScrollArea className="pb-1.5">
        <div className="flex flex-row-reverse gap-x-4 p-1 min-w-110">
          {additionalsList.map((form) => {
            const isActive = form.query === formSearchParam;

            if (!form.productType.includes(product.productType)) return null;

            return (
              <Button
                key={form.query}
                className={cn(
                  "py-2 rounded-xl bg-gray-200 active:opacity-75 transition-colors",
                  isActive && "bg-secondary"
                )}
                variant="accent"
                size="sm"
                onClick={() =>
                  router.push(
                    `/dashboard/admin/products/${product.id}?form=${form.query}`,
                    { scroll: false }
                  )
                }
              >
                {form.title}
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-1.5" />
      </ScrollArea>

      <AnimatePresence mode="wait">
        {additionalsList.map((form) => {
          const showComponent = form.query === formSearchParam;

          if (showComponent) {
            return (
              <MotionWrapper key={form.query}>
                <form.component />
              </MotionWrapper>
            );
          }
        })}
      </AnimatePresence>
    </>
  );
}
