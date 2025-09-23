import React, { useState } from "react";
import { Search } from "lucide-react";

import { useGetProductsToPick } from "../../api/related-product/use-get-product-to-pick";
import { useDebounce } from "@/hooks/use-debounced";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import ProductCard from "./product-card";
import { Loader } from "@/components/loader";
import { usePostProductRelations } from "../../api/related-product/use-post-product-relations";

export default function ProductPicker() {
  const [relatedProductList, setRelatedProductList] = useState<number[]>([]);

  const [debouncedSearchValue, setSearchValue] = useDebounce("");

  const [openModal, setOpenModal] = useState(false);
  // apis
  const { data, status } = useGetProductsToPick({
    searchQuery: debouncedSearchValue,
  });

  const { mutate: assignRelation, status: assignStatus } =
    usePostProductRelations();

  const modifyRelatedProducts = (
    productId: number,
    action: "select" | "unselect"
  ) => {
    if (action === "select") {
      setRelatedProductList((prev) => [...prev, productId]);
    } else {
      setRelatedProductList((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button size="sm">انتخاب محصولات</Button>
        </DialogTrigger>
        <DialogContent className="md:min-h-75 max-w-200! w-full">
          <DialogHeader className="flex flex-col sm:flex-row-reverse justify-between items-center h-fit">
            <DialogTitle className="text-sm md:text-lg text-right mr-5 w-fit">
              انتخاب محصولات
            </DialogTitle>
            <div className="flex items-center gap-x-2 w-fit h-fit">
              <div className="relative">
                <Input
                  onChange={(ev) => setSearchValue(ev.target.value)}
                  className="text-xs sm:text-sm md:text-base text-right pl-6.5"
                  placeholder="نام محصول"
                />
                <Search className="absolute left-1.5 top-1.5 size-5 text-muted-foreground" />
              </div>
              <Button
                onClick={() => {
                  assignRelation(
                    { relatedProductIds: relatedProductList },
                    {
                      onSuccess: () => {
                        setRelatedProductList([]);
                        setOpenModal(false);
                      },
                    }
                  );
                }}
                disabled={assignStatus === "pending"}
                size="sm"
              >
                انتخاب
              </Button>
            </div>
          </DialogHeader>

          {/* content */}
          {/* ok status and enough product  */}
          {status === "success" && data.products.length ? (
            <ScrollArea className="min-h-35 md:min-h-50 max-h-150">
              <div className="flex flex-col gap-y-1.5">
                {data.products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    selected={relatedProductList.includes(product.id)}
                    onChange={modifyRelatedProducts}
                  />
                ))}
              </div>
              <ScrollBar orientation="vertical" />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : null}
          {/* no product */}
          {status === "success" && !data.products.length ? (
            <div className="flex items-center justify-center h-full">
              هیچ محصولی وجود ندارد
            </div>
          ) : null}

          {/* loading and pending*/}
          {status === "pending" ? <Loader /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
