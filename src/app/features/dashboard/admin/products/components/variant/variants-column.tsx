"use client";
import { ColumnDef } from "@tanstack/react-table";

import type { ProductVariant } from "../../types";
import { Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteVariant } from "../../api/variant/use-delete-variant";
import Link from "next/link";
import { useParams } from "next/navigation";

type VariantActionsProps = {
  variantId: number;
};
const VariantActions = ({ variantId }: VariantActionsProps) => {
  const { productId } = useParams();
  const { mutate: deleteVariant } = useDeleteVariant();
  return (
    <div className="flex gap-x-1.5 justify-center items-center">
      <Link
        scroll={false}
        href={`/dashboard/admin/products/${productId}?form=variants&variantId=${variantId}`}
      >
        <Button size="icon" variant="ghost" className="size-8">
          <Edit />
        </Button>
      </Link>
      <Button
        onClick={() => deleteVariant(variantId)}
        size="icon"
        variant="ghost"
        className="size-8"
      >
        <X />
      </Button>
    </div>
  );
};

export type VariantColumnType = Omit<
  ProductVariant,
  "productVariantAttributeValues"
> & {
  [attributeId: `${number}`]: string;
};
export const columns: ColumnDef<VariantColumnType>[] = [
  {
    accessorKey: "actions",
    header: "",
    cell: (props) => (
      <VariantActions variantId={props.row.getValue("productVariantId")} />
    ),
  },
  {
    accessorKey: "productVariantId",
    header: "شناسه",
  },

  {
    accessorKey: "price",
    header: "قیمت",
  },
  {
    accessorKey: "specialPrice",
    header: "قیمت تخفیف خورده",
  },

  {
    accessorKey: "width",
    header: "عرض",
  },
  {
    accessorKey: "length",
    header: "طول",
  },
  {
    accessorKey: "height",
    header: "ارتفاع",
  },
  {
    accessorKey: "weight",
    header: "وزن",
  },
];
