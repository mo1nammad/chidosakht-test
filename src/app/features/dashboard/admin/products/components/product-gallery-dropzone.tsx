import React, { useState } from "react";
import { Check, Plus, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  // AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { convertToBase64 } from "@/lib/utils";

type AppProps = {
  value: { url: string; id: number }[];
  onChange: (value: { url: string; id: number }[]) => void;
};

export default function ProductGalleryDropzone({ onChange, value }: AppProps) {
  const [open, setOpen] = useState(false);

  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 1024000,
  });

  const handleFiles = async () => {
    // asynchronize convert images to base64 and add them to list
    const filePromises = acceptedFiles.map(
      (image, index) =>
        new Promise<{ id: number; url: string }>((resolve) => {
          convertToBase64(image, (url) =>
            resolve({ id: index + value.length, url })
          );
        })
    );

    const newList = await Promise.all(filePromises);
    const _imagesList = [...value, ...newList];
    // update

    onChange(_imagesList);
    setOpen(false);
  };

  return (
    <div className="flex flex-row-reverse items-center gap-x-3 ">
      <h5 className="text-lg">گالری</h5>
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
            <Button type="button" onClick={handleFiles}>
              ادامه
            </Button>
            <AlertDialogCancel type="button">انصراف</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
