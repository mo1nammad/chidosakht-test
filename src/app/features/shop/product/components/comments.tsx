"use client";

import React from "react";
import { ChevronDown, CircleUser } from "lucide-react";

import { DateFormatter } from "@/lib/utils";
import { useComments } from "../api/use-comments";

import { Card } from "@/components/ui/card";
import { Loader } from "@/components/loader";

export default function Comments() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useComments();

  return (
    <div className="flex flex-col items-end gap-4">
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.comments.map((comment) => (
            <Card
              key={comment.id}
              className="w-full px-6 py-5 text-right border-gray-200"
            >
              <div className="flex items-center justify-end gap-x-2">
                <p>{comment.fullNameUser}</p>
                <CircleUser />
              </div>
              <p
                dir="rtl"
                className="text-xs md:text-sm text-muted-foreground mt-2"
              >
                {DateFormatter.format(new Date(comment.createTime))}
              </p>
              <p className="mt-4 text-sm md:text-base">{comment.text}</p>
            </Card>
          ))}
        </React.Fragment>
      ))}
      {!data?.pages[0].comments.length && (
        <div className="flex w-full justify-center items-center py-8 border-b text-muted-foreground">
          هیچ نظری وجود ندارد
        </div>
      )}

      {hasNextPage && (
        <button
          className="flex items-center justify-center w-fit text-primary text-sm cursor-pointer disabled:opacity-70 disabled:cursor-auto"
          disabled={!hasNextPage}
          dir="rtl"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? (
            <Loader />
          ) : hasNextPage ? (
            <>
              نظرات بیشتر
              <ChevronDown size={15} />
            </>
          ) : (
            "کامنت دیگری وجود ندارد"
          )}
        </button>
      )}
    </div>
  );
}
