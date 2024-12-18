"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const FilterProjectSection = ({}) => {
  const searchParams = useSearchParams();
  const filterId = searchParams.get("project-filter-id");

  const pushRoute = (filter: number) =>
    window.history.pushState(
      `${filter}`,
      "Title",
      `/?project-filter-id=${filter}`
    );
  /*
    id : 0 == >طراحی داخلی< Default
    id : 1 == >بازسازی<
    id : 2 == >طراحی نما<
  */

  return (
    <div className="flex items-center bg-muted rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => pushRoute(0)}
        className={cn(
          "w-28 text-center py-2 transition relative",
          (filterId === "0" || filterId === null) &&
            "text-primary before:absolute before:w-2.5 before:h-2 before:bg-primary before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full"
        )}
      >
        طراحی داخلی
      </button>
      <div className="border-l border-border w-1 h-2/3" />
      <button
        onClick={() => pushRoute(1)}
        className={cn(
          "w-28 text-center py-2 transition relative",
          filterId === "1" &&
            "text-primary before:absolute before:w-2.5 before:h-2 before:bg-primary before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full"
        )}
      >
        بازسازی
      </button>
      <div className="border-l border-border w-1 h-2/3" />
      <button
        onClick={() => pushRoute(2)}
        className={cn(
          "w-28 text-center py-2 transition relative",
          filterId === "2" &&
            "text-primary before:absolute before:w-2.5 before:h-2 before:bg-primary before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full"
        )}
      >
        طراحی نما
      </button>
    </div>
  );
};
