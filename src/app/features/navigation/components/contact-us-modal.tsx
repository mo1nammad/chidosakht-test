"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import FAQSection from "../about-us/components/faq-section";
import ContactUsForm from "./contact-us-form";
import { useEffect } from "react";

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
    } else document.body.style.overflow = "auto";
  }, [modalParam]);

  return (
    <>
      <div
        className={cn(
          "fixed z-30 inset-0 bg-black transition duration-500 ease-out",
          modalParam === "contact-us" ? "opacity-65" : "opacity-0"
        )}
        onClick={() => router.back()}
      />

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-[500px] bg-muted rounded-b-xl max-w-screen-xl mx-auto transition-[top] duration-500 ease-out py-12 px-8 xl:px-4",
          modalParam === "contact-us" ? "top-0" : "-top-[500px]",
          className
        )}
      >
        <div className="flex h-full ">
          <div className="flex-grow">
            <ContactUsForm />
          </div>
          <div className="w-1 h-5/6 self-center border-e border-gray-300 mx-12" />
          <div className="basis-[500px] text-right font-light flex flex-col items-end">
            <p className="font-yekan-light text-sm mb-2">سوالات اطلاعاتی</p>
            <h3 className="text-xl text-black">سوالات متداول</h3>
            <FAQSection className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
