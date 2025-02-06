import { cn } from "@/lib/utils";
import SidebarNavigation from "./sidebar-navigation";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
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

export default Sidebar;
