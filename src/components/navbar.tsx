import NavigationMenu from "./navigaion-menu";
import NavigationButtonGroup from "./navigation-button-group";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 h-20 md:h-[110px] shadow-md rounded-2xl bg-background">
      <nav className="max-w-screen-xl mx-auto px-4 xl:px-0 h-full flex items-center justify-between">
        <div
          id="button-group"
          className="flex items-center gap-x-8 w-full md:w-auto justify-between md:justify-normal"
        >
          <NavigationButtonGroup />
        </div>
        <div id="menu" className="hidden items-center xl:flex">
          <NavigationMenu />
        </div>
        <div id="logo" className="md:flex items-center gap-x-3 hidden">
          <span className="text-2xl font-vazir-semibold">Chidosakht</span>
          <Image src="/logo.svg" width={71} height={56} alt="logo" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
