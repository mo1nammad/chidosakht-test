import React, { PropsWithChildren } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { createProductAdditonalFormsList as additionalsList } from "@/app/features/dashboard/constants";
import { Button } from "@/components/ui/button";

type AppProps = {
  disableFields?: Record<string, boolean>;
};

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

export default function ProductAdditionals({ disableFields }: AppProps) {
  const { productId } = useParams();
  const router = useRouter();
  const searchingForm = useSearchParams().get("form");

  return (
    <>
      <div className="flex flex-row-reverse gap-x-4 p-1">
        {additionalsList.map((form) => {
          const disabled = disableFields?.[form.query];
          const isActive =
            form.query === "pricing"
              ? searchingForm === form.query || searchingForm === null
              : searchingForm === form.query;

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
                  `/dashboard/admin/products/${productId}?form=${form.query}`,
                  { scroll: false }
                )
              }
              disabled={disabled}
            >
              {form.title}
            </Button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {additionalsList.map((form) => {
          const showComponent =
            form.query === "pricing"
              ? searchingForm === form.query || searchingForm === null
              : searchingForm === form.query;

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
