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

type Props = {
  className?: string;
};

const MobileSidebar = ({ className }: Props) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Sheet>
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
