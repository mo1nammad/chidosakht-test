import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import SidebarNavigation from "./sidebar-navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const MobileSidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Sheet open={show} onOpenChange={setShow}>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <Menu className="size-8!" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-0">
          <SheetTitle className="sr-only">MobileSidebar</SheetTitle>
          <SidebarNavigation />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
