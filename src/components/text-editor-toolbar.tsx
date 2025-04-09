import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  SeparatorHorizontal,
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ImageUp,
  LinkIcon,
  X,
  Upload,
  Loader,

  // PaintBucket,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Card } from "./ui/card";
import { Toggle } from "./ui/toggle";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { uploadFileToAws } from "@/actions/s3.action";
import { toast } from "@/lib/toast";
import { TextEditorContext } from "./text-editor";

export type ToolbarProps = {
  className?: string;
  editor: Editor | null;
  opt?: {
    textFormatting?: boolean;
    textAlignment?: boolean;
    headings?: boolean;
    lists?: boolean;
    undoRedo?: boolean;
  };
};

export const Toolbar = ({ className, editor, opt }: ToolbarProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (dir: "left" | "right") => {
    scrollAreaRef.current?.scrollTo({
      behavior: "smooth",
      left:
        dir === "left"
          ? scrollAreaRef.current?.scrollLeft - 150
          : scrollAreaRef.current?.scrollLeft + 150,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const parentBoundingBox = containerRef.current?.getBoundingClientRect();
    if (!parentBoundingBox) return;

    const touched =
      (e.clientX - parentBoundingBox.left) / parentBoundingBox.width;

    if (touched > 0.9) {
      handleScroll("right");
    }
    if (touched < 0.1) {
      handleScroll("left");
    }
  };

  if (!editor) return null;

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className={cn("relative", className)}
        onMouseMove={handleMouseMove}
      >
        <ScrollArea ref={scrollAreaRef} className="w-full pb-5">
          <ScrollBar orientation="horizontal" />
          <div className="flex items-center gap-4">
            {opt?.textFormatting || !opt ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="text-left flex gap-2 p-2">
                    <Toggle
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      pressed={editor.isActive("bold")}
                    >
                      <Bold />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      pressed={editor.isActive("italic")}
                    >
                      <Italic />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleStrike().run()
                      }
                      pressed={editor.isActive("strike")}
                    >
                      <Strikethrough />
                    </Toggle>
                  </Card>
                </TooltipTrigger>
                <TooltipContent variant="secondary">فرمت متن</TooltipContent>
              </Tooltip>
            ) : null}
            {opt?.textAlignment || !opt ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="text-left flex gap-2 p-2">
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                      }
                      pressed={editor.isActive({ textAlign: "left" })}
                    >
                      <AlignLeft />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                      }
                      pressed={editor.isActive({ textAlign: "center" })}
                    >
                      <AlignCenter />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                      }
                      pressed={editor.isActive({ textAlign: "right" })}
                    >
                      <AlignRight />
                    </Toggle>
                    <Toggle
                      onClick={() => editor.commands.setTextDirection("ltr")}
                      pressed={editor.isActive({ TextDirection: "ltr" })}
                    >
                      <ArrowLeftFromLine />
                    </Toggle>
                    <Toggle
                      onClick={() => {
                        editor.commands.setTextDirection("rtl");
                      }}
                      pressed={editor.isActive({ TextDirection: "rtl" })}
                    >
                      <ArrowRightFromLine />
                    </Toggle>
                  </Card>
                </TooltipTrigger>
                <TooltipContent variant="secondary">چینش متن</TooltipContent>
              </Tooltip>
            ) : null}
            {opt?.headings || !opt ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="text-left flex gap-2 p-2">
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                      }
                      pressed={editor.isActive("heading", { level: 1 })}
                    >
                      <Heading1 />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                      pressed={editor.isActive("heading", { level: 2 })}
                    >
                      <Heading2 />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                      }
                      pressed={editor.isActive("heading", { level: 3 })}
                    >
                      <Heading3 />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                      }
                      pressed={editor.isActive("heading", { level: 4 })}
                    >
                      <Heading4 />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                      }
                      pressed={editor.isActive("heading", { level: 5 })}
                    >
                      <Heading5 />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                      }
                      pressed={editor.isActive("heading", { level: 6 })}
                    >
                      <Heading6 />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().setParagraph().run()
                      }
                      pressed={editor.isActive("paragraph")}
                    >
                      p
                    </Toggle>
                  </Card>
                </TooltipTrigger>
                <TooltipContent variant="secondary">
                  سرفصل و پاراگراف
                </TooltipContent>
              </Tooltip>
            ) : null}
            {opt?.lists || !opt ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="text-left flex gap-2 p-2">
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      pressed={editor.isActive("bulletList")}
                    >
                      <List />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      pressed={editor.isActive("orderedList")}
                    >
                      <ListOrdered />
                    </Toggle>
                    <Toggle
                      onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                      }
                      pressed={editor.isActive("blockquote")}
                    >
                      <Quote />
                    </Toggle>

                    <ImageInputPopover
                      handleUpload={(url) =>
                        editor
                          .chain()
                          .focus()
                          .setImage({ src: url, alt: "blog image" })
                          .run()
                      }
                    >
                      <ImageUp />
                    </ImageInputPopover>

                    <LinkInputPopover
                      handleInsert={(url) =>
                        editor
                          .chain()
                          .focus()
                          .setLink({ href: url, target: "_blank" })
                          .run()
                      }
                    >
                      <LinkIcon />
                    </LinkInputPopover>

                    <Toggle
                      onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                      }
                    >
                      <SeparatorHorizontal />
                    </Toggle>
                  </Card>
                </TooltipTrigger>
                <TooltipContent variant="secondary">
                  دسترسی های تکمیلی
                </TooltipContent>
              </Tooltip>
            ) : null}
            {opt?.undoRedo || !opt ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="text-left flex gap-2 p-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size={"sm"}
                      onClick={() => editor.chain().focus().undo().run()}
                      disabled={!editor.can().chain().focus().undo().run()}
                    >
                      <Undo2 />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size={"sm"}
                      onClick={() => editor.chain().focus().redo().run()}
                      disabled={!editor.can().chain().focus().redo().run()}
                    >
                      <Redo2 />
                    </Button>
                  </Card>
                </TooltipTrigger>
                <TooltipContent variant="secondary">
                  برگشت به عملیات قبل یا بعد
                </TooltipContent>
              </Tooltip>
            ) : null}

            {/* <Toggle
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        pressed={editor.isActive("textStyle", { color: "#958DF1" })}
      >
        <PaintBucket />
      </Toggle> */}
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};
type ImageInputPopoverProps = {
  children: React.ReactNode;
  handleUpload: (url: string) => void;
};

function ImageInputPopover({ children, handleUpload }: ImageInputPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const { imageS3Path } = useContext(TextEditorContext);
  const { acceptedFiles, getRootProps, getInputProps, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png", ".jpg", ".jpeg", ".webp"],
      },
      maxSize: 512000,
      maxFiles: 1,
    });

  const onUpload = async () => {
    if (acceptedFiles[0]) {
      // convertToBase64(acceptedFiles[0], handleUpload);
      try {
        setIsUploading(true);

        const url = await uploadFileToAws(acceptedFiles[0], imageS3Path);

        setIsUploading(false);
        handleUpload(url);
        setOpen(false);
      } catch (_e) {
        console.log(_e);
        toast.error("مشکلی در آپلودپیش آمده است با پشتیبانی تماس بگیرید");
        setIsUploading(false);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 h-22 flex items-center gap-x-5">
        {!!acceptedFiles[0] && (
          <Button
            size="icon"
            variant="outline"
            onClick={onUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader className="animate-spin size-3.5!" />
            ) : (
              <Upload className="size-3.5!" />
            )}
          </Button>
        )}
        <div
          {...getRootProps()}
          className="w-full h-full relative flex flex-row-reverse items-center justify-between"
        >
          <Button type="button" variant="accent" size="sm">
            {acceptedFiles[0] ? <X /> : <span>انتخاب تصویر</span>}
          </Button>
          <input {...getInputProps()} type="file" />
          <div
            className={cn(
              "text-xs truncate max-w-42",
              isDragReject && "text-red-500"
            )}
          >
            {(!isDragReject && acceptedFiles[0]?.name) ?? (
              <div className="flex flex-col justify-center items-center">
                <span>هیچ فایلی انتخاب نشده</span>
                <span className="text-[11px] text-red-500">
                  حداکثر 512 کیلوبایت
                </span>
              </div>
            )}
            {isDragReject && "فرمت فایل انتخابی مجاز نیست"}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

type LinkInputPopoverProps = {
  children: React.ReactNode;
  handleInsert: (url: string) => void;
};

function LinkInputPopover({ children, handleInsert }: LinkInputPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    if (!value) {
      setOpen(false);
      return;
    }

    handleInsert(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 text-right flex justify-between">
        <Button size="icon" variant="outline" onClick={handleSubmit}>
          <Upload className="size-3.5!" />
        </Button>
        <div className="flex flex-row-reverse items-center gap-x-2.5">
          <label className="text-sm" htmlFor="link-input">
            :لینک
          </label>
          <Input
            id="link-input"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
