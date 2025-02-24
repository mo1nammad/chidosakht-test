import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { uploadFileToAws } from "@/actions/s3.action";

import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { awsFolderNames } from "@/lib/s3";

type Props = {
  className?: string;
  onChange?: (value: string) => void;
  value?: string | null;
};
export default function ThumbnailDropzone({
  className,
  onChange,
  value,
}: Props) {
  const [src, setSrc] = useState(value ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const { blogId } = useParams();
  const { getInputProps, acceptedFiles, getRootProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 1024000,
    maxFiles: 1,
  });

  useEffect(() => {
    const onUpload = async () => {
      if (typeof blogId !== "string") return;

      try {
        setSrc("");
        setIsUploading(true);
        const url = await uploadFileToAws(
          acceptedFiles[0],
          awsFolderNames(blogId).blogs.thumbnails
        );
        setIsUploading(false);
        setSrc(url);
      } catch (_e) {
        console.log(_e);
        toast.error("مشکلی در آپلودپیش آمده است با پشتیبانی تماس بگیرید");
        setIsUploading(false);
      }
    };

    if (acceptedFiles[0]) {
      onUpload();
    }
  }, [acceptedFiles, blogId]);

  useEffect(() => {
    if (onChange) {
      onChange(src);
    }
  }, [src, onChange]);

  return (
    <div
      {...getRootProps()}
      className={cn("flex items-center justify-center w-full", className)}
    >
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        {src ? (
          <Image
            src={src}
            alt="blog thumbnail"
            width={1000}
            height={1000}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="text-gray-400" />
            {isUploading ? (
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">
                درحال آپلود
              </h4>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  <span className="font-semibold">برای آپلود کلیک کنید</span> یا
                  فایل مورد نظر را داخل باکس بکشید
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  png, jpg, jpeg, webp
                </p>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 mt-2"
                  dir="rtl"
                >
                  حداکثر 1MB
                </p>
              </>
            )}
          </div>
        )}
        <input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
}
