import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const DashboardNavbar = ({ className }: Props) => {
  return (
    <div
      className={cn("fixed top-0 inset-x-0  border-b bg-green-500", className)}
    ></div>
  );
};

export default DashboardNavbar;
