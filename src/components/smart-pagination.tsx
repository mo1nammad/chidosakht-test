import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  countPages?: number;
  setPage: (val: number) => void;
};

export default function SmartPagination({
  currentPage,
  setPage,
  totalPages = 1,
  countPages = 3,
}: Props) {
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const items = [];
    // Previous
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goToPage(currentPage - 1);
          }}
        />
      </PaginationItem>
    );

    // First Ellipsis (if needed)
    if (currentPage > countPages) {
      items.push(
        <PaginationItem key="ellipsis-back">
          <PaginationEllipsis
            onClick={() => goToPage(Math.max(1, currentPage - countPages))}
            className="cursor-pointer"
          />
        </PaginationItem>
      );
    }

    // Centered page numbers (max 3)
    const pageRange = getCenteredPages(currentPage, totalPages, countPages);
    for (const p of pageRange) {
      items.push(
        <PaginationItem key={p}>
          <PaginationLink
            href="#"
            isActive={p === currentPage}
            onClick={(e) => {
              e.preventDefault();
              goToPage(p);
            }}
          >
            {p}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last Ellipsis (if needed)
    if (currentPage < totalPages - countPages + 1) {
      items.push(
        <PaginationItem key="ellipsis-forward">
          <PaginationEllipsis
            onClick={() =>
              goToPage(Math.min(totalPages, currentPage + countPages))
            }
            className="cursor-pointer"
          />
        </PaginationItem>
      );
    }

    // Next
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goToPage(currentPage + 1);
          }}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>{renderPageNumbers()}</PaginationContent>
    </Pagination>
  );
}

function getCenteredPages(
  current: number,
  total: number,
  count: number
): number[] {
  const half = Math.floor(count / 2);
  let start = Math.max(1, current - half);
  let end = start + count - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - count + 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
