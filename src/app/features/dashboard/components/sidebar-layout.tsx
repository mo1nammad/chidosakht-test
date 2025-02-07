import { cn } from "@/lib/utils";
import SidebarNavigation from "./sidebar-navigation";

type Props = {
  className?: string;
};

const SidebarLayout = ({ className }: Props) => {
  return (
    <aside
      className={cn(
        "fixed right-0 inset-y-0 border-l border-border flex flex-col ",
        className
      )}
    >
      <SidebarNavigation />
    </aside>
  );
};

export default SidebarLayout;
