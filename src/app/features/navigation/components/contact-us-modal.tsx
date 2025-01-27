"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect } from "react";

import { cn } from "@/lib/utils";
import FAQSection from "../about-us/components/faq-section";
import ContactUsForm from "./contact-us-form";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

type AppProps = {
  className?: string;
};

export default function ContactUsModal({ className }: AppProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalParam = searchParams.get("modal");

  useEffect(() => {
    if (modalParam === "contact-us") {
      document.body.style.overflow = "hidden";
    } else document.body.removeAttribute("style");
  }, [modalParam]);

  return (
    <Suspense>
      {/* overlay */}
      <AnimatePresence>
        {modalParam && (
          <motion.div
            className="fixed z-30 inset-0 bg-black transition duration-500 ease-out mt-20 md:mt-[110px] xl:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.back()}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "fixed inset-x-0 h-full lg:h-fit overflow-y-scroll lg:overflow-auto top-0 z-40 bg-muted rounded-b-xl max-w-(--breakpoint-xl) mx-auto transition-[top] duration-500 ease-out",
          modalParam === "contact-us"
            ? "top-0"
            : "-top-[1170px] lg:-top-[630px]",
          className
        )}
      >
        <Button
          variant={"link"}
          className="absolute left-4 top-10 text-xs text-muted-foreground"
          onClick={() => router.back()}
        >
          <MoveLeft className="size-2" />
          بازگشت
        </Button>
        <div className="flex h-fit flex-col lg:flex-row p-12">
          <div className="lg:grow">
            <ContactUsForm />
          </div>
          {/* seperator */}
          <div className="lg:w-1 lg:h-[400px] w-full h-1 my-12 self-center lg:border-e border-t border-gray-300 lg:mx-12" />
          {/* separator */}
          <div className="h-fit lg:basis-[500px] text-right font-light flex flex-col items-end">
            <p className="font-yekan-light text-sm mb-2">سوالات اطلاعاتی</p>
            <h3 className="text-xl text-black">سوالات متداول</h3>
            <FAQSection className="min-h-[500px] lg:min-h-max" />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
