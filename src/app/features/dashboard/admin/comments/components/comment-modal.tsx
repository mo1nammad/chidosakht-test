"use client";

import React from "react";
import { CircleUser, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn, DateFormatter } from "@/lib/utils";
import { Comment } from "../types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useConfirmComment } from "../api/use-confirm-comment";
import { useDeleteComment } from "../api/use-delete-comment";

type AppProps = {
  comment?: Comment;
};

const stars = [1, 2, 3, 4, 5];

export default function CommentModal({ comment }: AppProps) {
  const router = useRouter();
  const searchParmas = useSearchParams();
  const commentId = searchParmas.get("modal");

  const isOpen = commentId ? true : false;

  const { mutate: confirmComment } = useConfirmComment();
  const { mutate: deleteComment } = useDeleteComment();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        if (!val) router.back();
      }}
    >
      <DialogContent className="w-full px-6 py-8 text-right border-gray-200">
        <DialogHeader>
          <DialogTitle className="sr-only">comment confirmation</DialogTitle>
        </DialogHeader>

        {comment ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex">
                {stars.map((star) => (
                  <div key={star}>
                    <Star
                      className={cn(
                        "text-transparent cursor-pointer size-5",
                        star > comment.star ? "fill-gray-200" : "fill-[#FF9F0E]"
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-x-2">
                <p>{comment.fullNameUser}</p>
                <CircleUser />
              </div>
            </div>

            <p dir="rtl" className="text-xs md:text-sm text-muted-foreground">
              {DateFormatter.format(new Date(comment.createTime))}
            </p>
            <p className="mt-4 text-sm md:text-base">{comment.text}</p>
          </>
        ) : null}

        {commentId && !comment?.confirmation ? (
          <Button
            onClick={() =>
              confirmComment(commentId, {
                onSuccess: () => router.back(),
              })
            }
            variant="outline"
          >
            تایید کامنت
          </Button>
        ) : (
          <p>این کامنت تایید شده است</p>
        )}
        <Button
          onClick={() =>
            commentId
              ? deleteComment(commentId, {
                  onSuccess: () => router.back(),
                })
              : null
          }
          variant="destructive"
        >
          حذف کامنت
        </Button>
      </DialogContent>
    </Dialog>
  );
}
