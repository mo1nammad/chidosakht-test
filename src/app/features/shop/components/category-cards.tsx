import { Triangle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CategoryCards() {
  return (
    <>
      {/* on large and mid devices */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10 md:h-84 lg:h-69">
        {/* card */}
        <div className="bg-secondary overflow-hidden relative rounded-2xl flex items-center justify-between">
          <div className="h-4/3 w-1/2 rounded-full absolute -left-1/5 bottom-1/2 translate-y-1/2 bg-[#2563EB]/60" />
          <div>Image</div>
          <div dir="rtl" className="flex flex-col pr-6">
            <Link href="#" className="flex items-center gap-x-1">
              <p className="text-[22px] font-bold">دسته بندی</p>
              <Triangle
                className="-rotate-90 size-2.5 text-[#817F7F]"
                fill="#817F7F"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              بیش از ۱۰۰۰ مدل
            </p>
          </div>
        </div>{" "}
        {/* card */}
        <div className="bg-secondary overflow-hidden relative rounded-2xl flex items-center justify-between">
          <div className="h-4/3 w-1/2 rounded-full absolute -left-1/5 bottom-1/2 translate-y-1/2 bg-[#2563EB]/60" />
          <div>Image</div>
          <div dir="rtl" className="flex flex-col pr-6">
            <Link href="#" className="flex items-center gap-x-1">
              <p className="text-[22px] font-bold">دسته بندی</p>
              <Triangle
                className="-rotate-90 size-2.5 text-[#817F7F]"
                fill="#817F7F"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              بیش از ۱۰۰۰ مدل
            </p>
          </div>
        </div>{" "}
        {/* card */}
        <div className="bg-secondary overflow-hidden relative rounded-2xl flex items-center justify-between">
          <div className="h-4/3 w-1/2 rounded-full absolute -left-1/5 bottom-1/2 translate-y-1/2 bg-[#2563EB]/60" />
          <div>Image</div>
          <div dir="rtl" className="flex flex-col pr-6">
            <Link href="#" className="flex items-center gap-x-1">
              <p className="text-[22px] font-bold">دسته بندی</p>
              <Triangle
                className="-rotate-90 size-2.5 text-[#817F7F]"
                fill="#817F7F"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              بیش از ۱۰۰۰ مدل
            </p>
          </div>
        </div>{" "}
        {/* card */}
        <div className="bg-secondary overflow-hidden relative rounded-2xl flex items-center justify-between">
          <div className="h-4/3 w-1/2 rounded-full absolute -left-1/5 bottom-1/2 translate-y-1/2 bg-[#2563EB]/60" />
          <div>Image</div>
          <div dir="rtl" className="flex flex-col pr-6">
            <Link href="#" className="flex items-center gap-x-1">
              <p className="text-[22px] font-bold">دسته بندی</p>
              <Triangle
                className="-rotate-90 size-2.5 text-[#817F7F]"
                fill="#817F7F"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              بیش از ۱۰۰۰ مدل
            </p>
          </div>
        </div>{" "}
        {/* card */}
        <div className="bg-secondary overflow-hidden relative rounded-2xl flex items-center justify-between">
          <div className="h-4/3 w-1/2 rounded-full absolute -left-1/5 bottom-1/2 translate-y-1/2 bg-[#2563EB]/60" />
          <div>Image</div>
          <div dir="rtl" className="flex flex-col pr-6">
            <Link href="#" className="flex items-center gap-x-1">
              <p className="text-[22px] font-bold">دسته بندی</p>
              <Triangle
                className="-rotate-90 size-2.5 text-[#817F7F]"
                fill="#817F7F"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              بیش از ۱۰۰۰ مدل
            </p>
          </div>
        </div>{" "}
        {/* card */}
        <div className="bg-secondary overflow-hidden relative rounded-2xl flex items-center justify-between">
          <div className="h-4/3 w-1/2 rounded-full absolute -left-1/5 bottom-1/2 translate-y-1/2 bg-[#2563EB]/60" />
          <div>Image</div>
          <div dir="rtl" className="flex flex-col pr-6">
            <Link href="#" className="flex items-center gap-x-1">
              <p className="text-[22px] font-bold">دسته بندی</p>
              <Triangle
                className="-rotate-90 size-2.5 text-[#817F7F]"
                fill="#817F7F"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              بیش از ۱۰۰۰ مدل
            </p>
          </div>
        </div>
      </div>

      {/* on small devices */}

      <div className="grid md:hidden grid-cols-3 grid-flow-row h-57 gap-y-5">
        {/* card */}
        <div className="flex flex-col gap-y-3 items-center">
          <div className="relative flex items-center justify-center bg-[#2563EB]/60 size-20 rounded-2xl overflow-hidden">
            <div className="absolute size-57 bg-secondary rounded-full bottom-4" />
            <div className="relative z-10">image</div>
          </div>
          <h6 className="text-sm font-medium">دسته بندی</h6>
        </div>
        {/* card */}
        <div className="flex flex-col gap-y-3 items-center">
          <div className="relative flex items-center justify-center bg-[#2563EB]/60 size-20 rounded-2xl overflow-hidden">
            <div className="absolute size-57 bg-secondary rounded-full bottom-4" />
            <div className="relative z-10">image</div>
          </div>
          <h6 className="text-sm font-medium">دسته بندی</h6>
        </div>{" "}
        {/* card */}
        <div className="flex flex-col gap-y-3 items-center">
          <div className="relative flex items-center justify-center bg-[#2563EB]/60 size-20 rounded-2xl overflow-hidden">
            <div className="absolute size-57 bg-secondary rounded-full bottom-4" />
            <div className="relative z-10">image</div>
          </div>
          <h6 className="text-sm font-medium">دسته بندی</h6>
        </div>{" "}
        {/* card */}
        <div className="flex flex-col gap-y-3 items-center">
          <div className="relative flex items-center justify-center bg-[#2563EB]/60 size-20 rounded-2xl overflow-hidden">
            <div className="absolute size-57 bg-secondary rounded-full bottom-4" />
            <div className="relative z-10">image</div>
          </div>
          <h6 className="text-sm font-medium">دسته بندی</h6>
        </div>{" "}
        {/* card */}
        <div className="flex flex-col gap-y-3 items-center">
          <div className="relative flex items-center justify-center bg-[#2563EB]/60 size-20 rounded-2xl overflow-hidden">
            <div className="absolute size-57 bg-secondary rounded-full bottom-4" />
            <div className="relative z-10">image</div>
          </div>
          <h6 className="text-sm font-medium">دسته بندی</h6>
        </div>{" "}
        {/* card */}
        <div className="flex flex-col gap-y-3 items-center">
          <div className="relative flex items-center justify-center bg-[#2563EB]/60 size-20 rounded-2xl overflow-hidden">
            <div className="absolute size-57 bg-secondary rounded-full bottom-4" />
            <div className="relative z-10">image</div>
          </div>
          <h6 className="text-sm font-medium">دسته بندی</h6>
        </div>
      </div>
    </>
  );
}
