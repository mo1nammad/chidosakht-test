import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Check, Loader2, Plus, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { usePostProductImage } from "../api/image/use-post-product-images";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

export default function ProductGalleryDropzone() {
  const { productId } = useParams();
  const {
    mutateAsync: postImage,
    isPending,
    isError,
  } = usePostProductImage(productId as string);

  const [open, setOpen] = useState(false);
  const { getInputProps, getRootProps, acceptedFiles, inputRef } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 1024000,
  });

  const handleFiles = async () => {
    await Promise.all(
      acceptedFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        return postImage(formData);
      })
    );

    if (!isError) inputRef.current.value = "";

    // update

    setOpen(false);
  };

  return (
    <div className="flex flex-row-reverse items-center gap-x-3 ">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="secondary">
            <span>اضافه کردن تصویر</span>
            <Plus className="size-3.5!" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              اضافه کردن تصاویر
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              در این قسمت به لیست گالری خود می توانید تعدادی تصویر اضافه کنید
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div {...getRootProps()} className="w-full">
            <input {...getInputProps()} id="picture" type="file" multiple />
            <div className="cursor-pointer border w-full px-4 py-2 rounded-md flex items-center flex-row-reverse gap-x-2">
              {acceptedFiles.length > 0 ? (
                <>
                  <Check className="size-4" />
                  <div dir="rtl">
                    {acceptedFiles.length} فایل انتخاب شده است
                  </div>
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  <span>برای انتخاب فایل ها کلیک کنید</span>
                </>
              )}
            </div>
          </div>

          <AlertDialogFooter>
            {isPending ? (
              <div className="grid place-content-center mr-1.5">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Button type="button" onClick={handleFiles}>
                ادامه
              </Button>
            )}
            <AlertDialogCancel type="button">انصراف</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
