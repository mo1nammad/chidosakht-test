import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  servicesData,
  projectsData,
  commentsData,
} from "@/app/features/navigation/home/constants";
import { ServicesSlider } from "@/app/features/navigation/home/components/services-slider";
import { Title } from "@/components/title";
import { FilterProjectSection } from "@/app/features/navigation/home/components/filter-projects";
import { ProjectsSlider } from "@/app/features/navigation/home/components/projects-slider";
import { CommentsSlider } from "@/app/features/navigation/home/components/comments-slider";
import HeroImage from "@/app/features/navigation/home/components/hero-image";
import { WorkstepsMobileSlider } from "@/app/features/navigation/home/components/worksteps-mobile-slider";

export default function Home() {
  return (
    <div className="bg-background">
      {/* hero section */}
      <div className="container max-w-(--breakpoint-xl) mx-auto px-8 xl:px-4">
        <section className="flex flex-col xl:flex-row items-center justify-between pt-6">
          <HeroImage />

          <div className="flex flex-col mt-6 md:mt-0">
            <div className="flex flex-col justify-center gap-y-8 sm:gap-y-8 max-w-[540px] text-center xl:text-right">
              <h1 className="text-2xl sm:text-4xl font-yekan-black leading-snug">
                آجربه‌آجر تا خانه رویاییتان را از ما بخواهید
              </h1>
              <div className="max-w-[540px] text-muted-foreground">
                <p className="leading-7 text-sm sm:text-base">
                  در چیدوساخت، رویاهای مسکونی شما را با مهارت و اشتیاق به واقعیت
                  تبدیل می‌کنیم. با ترکیبی از تخصص، نوآوری و مصالح برتر،
                  خانه‌هایی می‌سازیم که نه تنها چشم‌نواز، بلکه ماندگار هستند با
                  چیدوساخت، خانه‌ای بسازید که هر گوشه‌اش داستانی از زندگی شما را
                  روایت کند.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto space-x-0 sm:space-x-7 self-center xl:self-end mt-8 flex flex-col gap-y-4 sm:flex-row gap-x-6 items-center justify-items-center sm:block">
              <Button
                size="lg"
                className="w-full sm:w-44 text-sm sm:text-base p-2"
                asChild
              >
                <Link href={"#"}>مشاهده نمونه کارها</Link>
              </Button>

              <Button
                size="lg"
                className="w-full sm:w-44 text-sm sm:text-base p-2"
                asChild
                variant="outline"
              >
                <Link href={"#"}>مشاهده خدمات</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="pb-8 mt-10">
          <Title>
            خدمات <span className="text-primary">چیدوساخت</span>
          </Title>
          <div
            id="services-swiper"
            className="mt-8 relative w-[calc(100%-40px)] mx-auto sm:w-full"
          >
            <ServicesSlider data={servicesData} />
          </div>
        </section>

        <section className="py-16 sm:py-20 relative">
          <WorkstepsMobileSlider />
          <div className="hidden md:grid  gap-y-0 md:gap-y-9 grid-cols-2 lg:grid-cols-3 grid-rows-2 mt-14 mx-auto">
            {/* left part */}
            <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
              <h1 className="w-36 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                تعریف پروژه
              </h1>
              <p className="max-w-[357px] text-center text-sm leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم
                ایپسوم متن ساختگی
              </p>
            </div>
            <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
              <h1 className="w-36 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                طراحی
              </h1>
              <p className="max-w-[357px] text-center text-sm leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم
                ایپسوم متن ساختگی
              </p>
            </div>

            {/* image */}
            <div className="relative row-span-2 col-start-2 row-start-1 content-center justify-items-center hidden lg:block">
              <Image
                src={"/home/marahelImage.png"}
                width={266}
                height={381}
                alt="work process"
                className="hidden lg:block lg:w-[152px] lg:h-[217px] xl:block xl:w-[266px] xl:h-[381px]"
              />
            </div>
            {/* right part */}
            <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
              <h1 className="w-36 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                بهره برداری
              </h1>
              <p className="max-w-[357px] text-center text-sm leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم
                ایپسوم متن ساختگی
              </p>
            </div>
            <div className="flex flex-col gap-y-4 items-center justify-center my-6 md:my-0">
              <h1 className="w-36 text-2xl bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                اجرا
              </h1>
              <p className="max-w-[357px] text-center text-sm leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید
                سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم
                ایپسوم متن ساختگی
              </p>
            </div>
          </div>
        </section>

        {/* about us */}

        <section className="w-full bg-muted h-fit rounded-[40px] flex flex-row-reverse justify-between gap-x-10 items-center py-9 px-6 lg:px-24 overflow-hidden">
          <div className="flex flex-col items-end gap-y-6 lg:gap-y-10 text-right max-w-full sm:max-w-100 xl:max-w-110">
            <Title>درباره ما</Title>
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-6">
              <p>
                شرکت چیدوساخت، با بیش از 17 سال تجربه در صنعت ساختمان، افتخار
                دارد خدمات جامع و تخصصی خود را در حوزه‌های مختلف ساخت و ساز به
                مشتریان ارائه دهد
              </p>
              <p>
                {" "}
                ما که پیش‌تر با نام فناوران سازه شناخته می‌شدیم، اکنون با نام
                چیدوساخت، آماده‌ایم تا تجربیات ارزشمند خود را در خدمت پروژه‌های
                مسکونی، اداری و تجاری قرار دهیم.
              </p>
            </div>
            <div className="flex items-center gap-x-2 bg-primary w-fit text-white p-1.5 rounded-xl">
              <Button
                asChild
                size="icon"
                className="h-6 w-6 sm:w-9 sm:h-9 py-2 sm:px-5 sm:py-4 bg-white transition-none hover:opacity-100 hover:bg-gray-100"
              >
                <Link href="/about-us">
                  <MoveLeft className="size-3! sm:size-5! text-foreground" />
                </Link>
              </Button>
              <span className="text-sm lg:text-base">مشاهده پروژه ها</span>
            </div>
          </div>
          <div className="hidden sm:grid grid-cols-2 grid-rows-3  gap-x-4 gap-y-3 md:w-80 md:h-50 lg:w-[400px] lg:h-[273px]">
            <div className="row-span-3 rounded-2xl overflow-hidden">
              <Image
                src="/home/about-us-sec-image.png"
                width={190}
                height={273}
                alt="about us"
                className="size-full object-cover"
              />
            </div>
            <div className="row-span-2 rounded-2xl overflow-hidden">
              <Image
                src="/home/istockphoto-1393537665-612x612 1.png"
                width={185}
                height={156}
                alt="about us"
                className="size-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/home/Three-Points-Blvd_061-2 1.png"
                width={185}
                height={156}
                alt="about us"
                className="size-full object-cover"
              />
            </div>
          </div>
        </section>
        <section id="projects" className="py-16 w-full">
          <div className="flex flex-col-reverse items-center gap-y-14 md:items-baseline md:flex-row justify-between">
            <FilterProjectSection />
            <div>
              <Title>نمونه پروژه ها</Title>
            </div>
          </div>
          {/* slides */}
          <div className="w-full bg-muted mt-5 rounded-2xl px-9">
            <ProjectsSlider data={projectsData} />
          </div>
        </section>
        <section>
          <Title classname="justify-center text-center">
            نظر و تجربه کاربران چیدوساخت
          </Title>
          <div className="drop-shadow-[0_0_25px_rgba(37,99,235,0.1)] py-12">
            <CommentsSlider data={commentsData} />
          </div>
        </section>
      </div>
    </div>
  );
}
