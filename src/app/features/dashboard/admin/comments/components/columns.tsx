import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import queryString from "query-string";

import { Comment } from "$/dashboard/admin/comments/types";

type CommentModalTriggerProps = {
  commentId: number;
};
const CommentModalTrigger = ({ commentId }: CommentModalTriggerProps) => {
  const searchParams = useSearchParams();

  const query = queryString.parse(searchParams.toString());
  return (
    <Link
      href={{
        query: {
          ...query,
          modal: commentId,
        },
      }}
    >
      <SquareArrowOutUpRight className="size-4 active:text-muted-foreground" />
    </Link>
  );
};

export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "productId",
    header: "شناسه محصول",
    cell: ({ cell }) => (
      <Link
        target="_blank"
        className="text-primary underline"
        href={`/shop/${cell.getValue()}`}
      >
        {cell.renderValue() as string}
      </Link>
    ),
  },
  {
    accessorKey: "productName",
    header: "نام محصول",
  },
  {
    accessorKey: "fullNameUser",
    header: "نام کاربر",
  },
  {
    accessorKey: "confirmation",
    header: "وضعیت",
  },
  {
    accessorKey: "action",
    cell: ({ row }) => <CommentModalTrigger commentId={row.getValue("id")} />,
  },
];
