"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { usePublishProduct } from "../api/use-publish-product";

type AppProps = {
  isPublished: boolean;
};

export default function ProductPublish({ isPublished }: AppProps) {
  const { mutate, isPending } = usePublishProduct();

  return !isPublished ? (
    <Button disabled={isPending} onClick={() => mutate()}>
      انتشار محصول
    </Button>
  ) : (
    <div>پنهان کردن محصول حذف محصول</div>
  );
}
