import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-background h-[757px]">
      {/* hero section */}
      <section className="flex items-center justify-between max-w-screen-xl mx-auto pt-6">
        <div className="relative w-1/2 h-[600px] overflow-hidden">
          <div
            className="relative w-full h-full"
            style={{
              backgroundColor: "#2563EB",
              background:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, #2563EB 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.6,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle closest-corner at center, transparent 60px, #ffffff 260px)",
              }}
            />
          </div>{" "}
          <Image
            alt="hero section image"
            width={448}
            height={450}
            src={"/home/Fanavaran 1.png"}
            className="absolute top-20 left-24"
          />
        </div>

        <div className="flex flex-col">
          <div
            className="flex flex-col justify-center gap-y-8 max-w-[540px]"
            dir="rtl"
          >
            <h1 className="text-4xl font-vazir-semibold">
              آجربه‌آجر تا خانه رویاییتان را از ما بخواهید
            </h1>
            <div className="max-w-[540px] text-muted-foreground">
              <p className="leading-7">
                در چیدوساخت ما با دقت و عشق خانه‌های رویایی شما را می‌سازیم.
              </p>
              <p className="leading-7">
                هر آجر نماد تعهد ما به کیفیت و نوآوری است.
              </p>
              <p className="leading-7">
                تیم ما از مهندسان و معماران مجرب در هر مرحله از طراحی تا ساخت در
                کنار شماست و با استفاده از بهترین مواد و تکنیک‌ها، پروژه‌های ما
                نه تنها زیبا، بلکه مستحکم و پایدار هستند.
              </p>
              <p className="leading-7">
                بیایید با هم، آجر به آجر، خانه‌ای بسازیم که مکانی برای خاطرات
                شیرین شما باشد. چیدوساخت، جایی که رویاها شکل می‌گیرند!
              </p>
            </div>
          </div>
          <div className="space-x-7 self-end mt-8">
            <Button asChild>
              <Link href={"#"}>مشاهده نمونه کارها</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href={"#"}>مشاهده خدمات</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
