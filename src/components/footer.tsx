import Image from "next/image";
import { Phone } from "lucide-react";
import {
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
export const Footer = () => {
  return (
    <>
      {" "}
      <footer className="bg-black text-white py-8">
        <div className="grid grid-cols-6 grid-flow-row xl:gap-x-[90px] gap-y-8 max-w-screen-xl mx-auto px-8">
          <article className="order-last col-span-6 md:col-span-3 text-center md:text-right max-w-[530px] mx-auto md:ml-auto">
            <h2 className="text-3xl text-primary font-yekan-black">
              چیدو ساخت
            </h2>
            <h6 className="text-sm">ساخت و ساز هر گونه سازه ای</h6>
            <p className="text-xs mt-3 leading-5">
              چیدوساخت، با تکیه بر دانش فنی و تجربه عملی، آماده است تا رؤیای
              ساختمانی شما را به واقعیت تبدیل کند. ما با ارائه خدمات جامع و با
              کیفیت، اطمینان حاصل می‌کنیم که پروژه شما با بالاترین استانداردها و
              در عین حال، با صرفه‌جویی اقتصادی به انجام برسد.
            </p>

            {/*phone */}
            <div className="flex flex-col gap-y-4 sm:flex-row items-center justify-center md:justify-end gap-x-12 mt-5">
              <div className="flex gap-x-2.5 items-center">
                <div className="">
                  <h6>شماره موبایل</h6>
                  <p className="text-sm">(+98) ۰۹۱۲۴۹۴۹۷۰۸</p>
                </div>
                <Phone fill="black" className="bg-white size-8 rounded-lg" />
              </div>
              <div className="flex gap-x-2.5 items-center">
                <div className="">
                  <h6>شماره ثابت دفتر</h6>
                  <p className="text-sm">(+98) 021-77800287</p>
                </div>
                <Phone fill="black" className="bg-white size-8 rounded-lg" />
              </div>
            </div>

            {/* socials */}
            <div className="flex items-center md:flex-row-reverse flex-col lg:flex-row-reverse mt-7 gap-x-8">
              <div className="flex items-center gap-x-3">
                <div className="flex items-center justify-center gap-x-2">
                  <a href="">
                    <FaLinkedin />
                  </a>
                  <a href="">
                    <FaTelegram />
                  </a>
                  <a href="">
                    {" "}
                    <FaInstagram />
                  </a>
                  <a href="">
                    {" "}
                    <FaWhatsapp />
                  </a>
                </div>
                <p>شبکه های اجتماعی</p>
              </div>
              <div className="flex items-center">
                <a href="mailto:algoritatech@gmail.com">
                  algoritatech@gmail.com
                </a>
                <p> : ایمیل</p>
              </div>
            </div>
          </article>
          {/* navigation */}
          <div className="hidden sm:flex col-span-6 xl:col-span-1 gap-x-5 sm:flex-row-reverse order-first xl:order-2 xl:flex-col justify-center text-center gap-y-2.5">
            <h3 className="text-primary font-semibold mb-2.5">
              دسترسی سریع تر
            </h3>
            <Link className="text-sm" href="/">
              صفحه‌اصلی
            </Link>
            <Link className="text-sm" href="/shop">
              فروشگاه
            </Link>
            <Link className="text-sm" href="/blogs">
              مطالب
            </Link>
            <Link className="text-sm" href="/about-us">
              درباره‌ ما
            </Link>
            <Link className="text-sm" href="/contact-us">
              ارتباط با‌ما
            </Link>
          </div>
          {/* map & licenses */}
          <div className="order-last md:order-first col-span-6 justify-self-center md:justify-self-start md:col-span-3 xl:col-span-2 grid grid-cols-3 grid-rows-3 w-[280px] sm:w-[324px] h-[294px] items-end gap-y-6">
            <Image
              src={"/home/map.png"}
              alt="map"
              width={324}
              height={189}
              className="object-cover w-full h-full col-span-3 row-span-2"
            />
            <Image
              src={"/home/enamad.png"}
              alt="enamad"
              width={75}
              height={90}
              className="object-cover col-span-1 row-span-1 justify-self-start"
            />
            <Image
              src={"/home/license.png"}
              alt="license"
              width={75}
              height={90}
              className="object-cover col-span-1 row-span-1 justify-self-center"
            />
            <Image
              src={"/home/enamad2.png"}
              alt="enamad2"
              width={75}
              height={90}
              className="object-cover h-[90px] col-span-1 row-span-1 item-end justify-self-end"
            />
          </div>
        </div>
      </footer>
      <div className="bg-[#333333] text-white">
        <div className="flex flex-col md:flex-row items-center justify-between  max-w-screen-xl mx-auto px-8 py-4 gap-4">
          <a href="">
            <span>طراحی سایت توسط تیم </span>
            <span className="text-purple-400">الگوریتا</span>
          </a>
          <p className="text-xs text-center">
            تمام حقوق مادی و معنوی این سایت متعلق به سایت چیدوساخت می‌باشد.
          </p>
        </div>
      </div>
    </>
  );
};
