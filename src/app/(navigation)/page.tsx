import Image from "next/image";
import Link from "next/link";

import { servicesData } from "@/app/features/home/constants";
import { Button } from "@/components/ui/button";
import { ServicesSlider } from "../features/home/components/services-slider";

export default function Home() {
  return (
    <div className="bg-background h-[757px]">
      {/* hero section */}
      <div className="container max-w-screen-xl mx-auto px-8">
        <section className="flex flex-col xl:flex-row items-center justify-between pt-6">
          <div className="relative w-fit h-[600px] overflow-hidden hidden md:block">
            <div
              className="relative size-[600px]"
              style={{
                backgroundColor: "#2563EB",
                background:
                  "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, #2563EB 1px)",
                backgroundSize: "40px 40px",
                opacity: 1,
              }}
            >
              <div
                className="absolute inset-0 size-[610px]"
                style={{
                  background:
                    "radial-gradient(closest-side, #ffffff80 140px, #ffffff99 150px , #ffffff 230px)",
                }}
              />
            </div>
            <Image
              alt="hero section image"
              width={448}
              height={450}
              src={"/home/Fanavaran 1.png"}
              className="absolute top-20 left-[70px]"
            />
          </div>

          <div className="flex flex-col mt-16 md:mt-0">
            <div className="flex flex-col justify-center gap-y-14 sm:gap-y-8 max-w-[540px] text-center xl:text-right">
              <h1 className="text-4xl font-yekan-black leading-snug">
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
                  تیم ما از مهندسان و معماران مجرب در هر مرحله از طراحی تا ساخت
                  در کنار شماست و با استفاده از بهترین مواد و تکنیک‌ها،
                  پروژه‌های ما نه تنها زیبا، بلکه مستحکم و پایدار هستند.
                </p>
                <p className="leading-7">
                  بیایید با هم، آجر به آجر، خانه‌ای بسازیم که مکانی برای خاطرات
                  شیرین شما باشد. چیدوساخت، جایی که رویاها شکل می‌گیرند!
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto space-x-0 sm:space-x-7 self-center xl:self-end mt-8 flex gap-y-6 flex-col items-center justify-items-center sm:block">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href={"#"}>مشاهده نمونه کارها</Link>
              </Button>

              <Button
                size="lg"
                className="w-full sm:w-auto"
                asChild
                variant="outline"
              >
                <Link href={"#"}>مشاهده خدمات</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="pb-8 mt-16">
          <div className="flex flex-row-reverse">
            <div className="w-fit relative">
              <h1 className="text-2xl font-yekan-semibold after:absolute after:inset-x-0 after:-bottom-1 after:w-full after:h-[0.5px] after:bg-primary after:drop-shadow-[0_3px_4px_rgba(20,34,189,1)]">
                خدمات <span className="text-primary">چیدوساخت</span>
              </h1>
            </div>
          </div>

          <div
            id="services-swiper"
            className="mt-8 relative w-[calc(100%-40px)] mx-auto sm:w-full"
          >
            <ServicesSlider data={servicesData} />
          </div>
        </section>

        <section className="py-20">
          <div className="flex items-center justify-center">
            <div className="w-fit relative">
              <h1 className="text-4xl font-yekan-semibold after:absolute after:inset-x-0 after:-bottom-2 after:w-full after:h-[0.5px] after:bg-primary after:drop-shadow-[0_3px_4px_rgba(20,34,189,1)]">
                مراحل انجام پروژه
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-x-16 mt-14 mx-auto">
            {/* left part */}
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
                <h1 className="w-52 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                  بهره برداری
                </h1>
                <p className="max-w-[357px] text-center md:text-right text-sm leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                  استلورم ایپسوم متن ساختگی
                </p>
              </div>
              <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
                <h1 className="w-52 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                  اجرا
                </h1>
                <p className="max-w-[357px] text-center md:text-right text-sm leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                  استلورم ایپسوم متن ساختگی
                </p>
              </div>
            </div>
            {/* image */}
            <div className="relative">
              <Image
                src={"/home/marahelImage.png"}
                width={266}
                height={381}
                alt="work process"
                className="hidden lg:block lg:w-[152px] lg:h-[217px] xl:block xl:w-[266px] xl:h-[381px]"
              />
            </div>
            {/* right part */}
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
                <h1 className="w-52 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                  تعریف پروژه
                </h1>
                <p className="max-w-[357px] text-center md:text-right text-sm leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                  استلورم ایپسوم متن ساختگی
                </p>
              </div>
              <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
                <h1 className="w-52 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                  طراحی
                </h1>
                <p className="max-w-[357px] text-center md:text-right text-sm leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                  استلورم ایپسوم متن ساختگی
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
