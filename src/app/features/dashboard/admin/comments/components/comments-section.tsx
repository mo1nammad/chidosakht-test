"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import { useComments } from "../api/use-comments";

import { CommentsDataTable } from "./data-table";
import { columns } from "./columns";

import { Loader } from "@/components/loader";
import SmartPagination from "@/components/smart-pagination";
import Filters from "./filters";
import CommentModal from "./comment-modal";

export default function CommentsSection() {
  const searchParams = useSearchParams();
  const queryObj = queryString.parse(searchParams.toString());

  const router = useRouter();

  const { data, isSuccess, isPending } = useComments();
  return (
    <div className="flex flex-col mt-6 gap-y-3.5">
      <Filters />
      {isSuccess && (
        <CommentsDataTable columns={columns} data={data.comments ?? []} />
      )}
      {isPending && <Loader className="my-12" />}

      {/* pagination */}
      {data && data.countAllPages > 1 && (
        <SmartPagination
          currentPage={Number(searchParams.get("Page") ?? 1)}
          setPage={(val) => {
            queryObj.Page = val.toString();
            router.push(
              `/dashboard/admin/comments?${queryString.stringify(queryObj)}`
            );
          }}
          totalPages={data.countAllPages}
          countPages={3}
        />
      )}

      <CommentModal
        comment={data?.comments.find(
          (comment) => comment.id === Number(searchParams.get("modal"))
        )}
      />
    </div>
  );
}
