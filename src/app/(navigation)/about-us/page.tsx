import Image from "next/image";
import { Title } from "@/components/title";
import LicenseGallery from "@/app/features/navigation/about-us/components/license-gallery";

export default function AboutUsPage() {
  return (
    <div className="px-8">
      {/* hero section */}
      <section className="max-w-screen-xl mx-auto flex flex-col gap-x-8 gap-y-12 lg:flex-row items-center justify-between py-12">
        <Image
          src="/about-us/smart-civil-architect-engineer-inspecting.png"
          alt="hero banner"
          width={475}
          height={333}
        />
        <div className="flex flex-col">
          <div className="text-center lg:text-right">
            <h1 className="font-yekan-black text-4xl">
              ... وقتشه با چیدوساخت بیشتر آشنا شی
            </h1>
            <div className="mt-8 mb-9 max-w-[580px] text-muted-foreground">
              <p>
                شرکت چیدوساخت، با بیش از 17 سال تجربه در صنعت ساختمان، افتخار
                دارد خدمات جامع و تخصصی خود را در حوزه‌های مختلف ساخت و ساز به
                مشتریان ارائه دهد
              </p>
              <p>
                ما که پیش‌تر با نام فناوران سازه شناخته می‌شدیم، اکنون با نام
                چیدوساخت، آماده‌ایم تا تجربیات ارزشمند خود را در خدمت پروژه‌های
                مسکونی، اداری و تجاری قرار دهیم
              </p>
            </div>
          </div>

          <div className="flex gap-3 self-center place-content-center flex-wrap">
            <div className="w-28 h-20 flex flex-col bg-secondary items-center justify-between pt-[14px] rounded-xl">
              <h6 className="text-primary text-sm">سالهای فعالیت</h6>
              <div className="bg-white w-[100px] text-center h-[35px] relative bottom-1.5 rounded-lg grid content-center font-black text-xl">
                +17
              </div>
            </div>
            <div className="w-28 h-20 flex flex-col bg-secondary items-center justify-between pt-[14px] rounded-xl">
              <h6 className="text-primary text-sm">نیروی مهندسی</h6>
              <div className="bg-white w-[100px] text-center h-[35px] relative bottom-1.5 rounded-lg grid content-center font-black text-xl">
                +40
              </div>
            </div>
            <div className="w-28 h-20 flex flex-col bg-secondary items-center justify-between pt-[14px] rounded-xl">
              <h6 className="text-primary text-sm">پروژه اجرایی</h6>
              <div className="bg-white w-[100px] text-center h-[35px] relative bottom-1.5 rounded-lg grid content-center font-black text-xl">
                +90
              </div>
            </div>
            <div className="w-28 h-20 flex flex-col bg-secondary items-center justify-between pt-[14px] rounded-xl">
              <h6 className="text-primary text-sm">در دست اجرا</h6>
              <div className="bg-white w-[100px] text-center h-[35px] relative bottom-1.5 rounded-lg grid content-center font-black text-xl">
                7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* features */}

      <section className="max-w-screen-xl mx-auto py-9">
        <Title classname="pb-10 items-start justify-start">
          خدمات جامع ساختمانی
        </Title>
        <div className="flex flex-col gap-x-8 gap-y-12 lg:flex-row justify-between ">
          <Image
            src="/about-us/1167.webp"
            alt="hero banner"
            width={354}
            height={292}
            className="hidden rounded-xl object-cover lg:block"
          />
          <div className="flex-1 text-right pl-7 md:pl-0">
            <p>
              چیدوساخت با ارائه راهکارهای اقتصادی و کارآمد، تمامی نیازهای
              ساختمانی شما را پوشش می‌دهد
            </p>
            <ul className="mt-9 space-y-2">
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">طراحی و مشاوره:</span>
                <span className="text-muted-foreground">
                  ارائه خدمات مشاوره معماری و مهندسی برای طراحی بهینه فضاها
                </span>
              </li>

              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">ساخت و ساز:</span>
                <span className="text-muted-foreground">
                  خدمات مشاوره معماری و مهندسی برای طراحی بهینه فضاها
                </span>
              </li>
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">تعمیر و نگهداری:</span>
                <span className="text-muted-foreground">
                  خدمات جامع نگهداری و تعمیرات ساختمان‌ها{" "}
                </span>
              </li>
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">تأسیسات:</span>
                <span className="text-muted-foreground">
                  نصب و راه‌اندازی سیستم‌های برقی، مکانیکی و تهویه مطبوع
                </span>
              </li>
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">نوسازی و بازسازی:</span>
                <span className="text-muted-foreground">
                  ارتقاء و به‌روزرسانی ساختمان‌های قدیمی
                </span>
              </li>
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">مدیریت پروژه:</span>
                <span className="text-muted-foreground">
                  نظارت دقیق بر تمامی مراحل اجرای پروژه
                </span>
              </li>
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">خدمات زمین:</span>
                <span className="text-muted-foreground">
                  محوطه‌سازی و آماده‌سازی زمین برای ساخت و ساز
                </span>
              </li>
              <li className="relative right-6 after:content-[''] after:absolute after:size-1 after:bg-black after:rounded-full after:top-2.5 after:-right-4">
                <span className="ml-1">ایمنی و کیفیت:</span>
                <span className="text-muted-foreground">
                  تضمین رعایت استانداردهای ایمنی و کیفیت در تمامی مراحل
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto py-9">
        <Title classname="pb-10 lg:pb-2 items-start justify-start">
          رویکرد ما
        </Title>
        <div className="flex flex-col gap-x-8 gap-y-12 lg:flex-row lg:items-center justify-between">
          <Image
            src="/about-us/martina-hayes-building.png"
            alt="hero banner"
            width={584}
            height={292}
            className="hidden lg:block rounded-xl object-cover w-[354px]"
          />
          <div className="flex-1 text-right pl-7 md:pl-0">
            <p className="before:content-[':']">
              در چیدوساخت، ما معتقدیم آگاهی‌سازی مشتریان، کلید موفقیت پروژه‌های
              ساختمانی است به همین دلیل
            </p>
            <ul className="mt-9 space-y-2">
              <li className="relative before:content-['.'] text-muted-foreground right-6 after:content-[''] after:absolute after:size-1 after:bg-muted-foreground after:rounded-full after:top-2.5 after:-right-4">
                با اطلاع‌رسانی دقیق درباره مسائل ساختمانی، دیدگاهی جامع به
                مشتریان ارائه می‌دهیم
              </li>

              <li className="relative before:content-['.'] text-muted-foreground right-6 after:content-[''] after:absolute after:size-1 after:bg-muted-foreground after:rounded-full after:top-2.5 after:-right-4">
                از طریق مشاوره‌های تخصصی، راهکارهای اقتصادی و فنی مهندسی ارائه
                می‌کنیم
              </li>
              <li className="relative before:content-['.'] text-muted-foreground right-6 after:content-[''] after:absolute after:size-1 after:bg-muted-foreground after:rounded-full after:top-2.5 after:-right-4">
                با بهره‌گیری از کادر مجرب، تمامی مراحل پروژه را پشتیبانی می‌کنیم
              </li>
              <li className="relative before:content-['.'] text-muted-foreground right-6 after:content-[''] after:absolute after:size-1 after:bg-muted-foreground after:rounded-full after:top-2.5 after:-right-4">
                با حذف واسطه‌ها، مصالح و تجهیزات با کیفیت را با قیمتی مناسب
                تأمین می‌کنیم
              </li>
              <li className="relative before:content-['.'] text-muted-foreground right-6 after:content-[''] after:absolute after:size-1 after:bg-muted-foreground after:rounded-full after:top-2.5 after:-right-4">
                طراحی و اجرای حرفه‌ای اما مقرون به صرفه را برای مشتریان فراهم
                می‌آوریم
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* licenses */}
      <section className="max-w-screen-xl mx-auto py-9">
        <Title classname="pb-9">گواهینامه ها</Title>
        <LicenseGallery />
      </section>
    </div>
  );
}
