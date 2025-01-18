import Image from "next/image";

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
    </div>
  );
}
