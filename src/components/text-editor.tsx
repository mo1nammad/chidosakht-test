import React from "react";
import { useDropzone } from "react-dropzone";
import {
  useEditor,
  EditorContent,
  EditorContentProps,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextDirection from "tiptap-text-direction";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

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
  // PaintBucket,
} from "lucide-react";

import { cn } from "@/lib/utils";
// src/Tiptap.tsx

import { Card } from "./ui/card";
import { Toggle } from "./ui/toggle";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import "./text-editor.css";
import { Button } from "./ui/button";
type Props = {
  className?: string;
  toolbar?: Omit<ToolbarProps, "editor">;
  tipTap?: Omit<EditorContentProps, "editor">;
};

export default function TextEditor({ className, tipTap, toolbar }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextDirection.configure({
        defaultDirection: "ltr",
        types: ["heading", "paragraph"],
      }),
      TextAlign.configure({
        types: ["paragraph", "heading", "bulletList", "orderedList"],
      }),

      Image,
      Link,
    ],

    editorProps: {
      attributes: {
        class:
          "rounded-md bg-background min-h-[400px] border-input border p-3 text-left",
      },
    },
  });
  return (
    <div className={cn("space-y-2.5 focus-visible:ring-0", className)}>
      <Toolbar {...toolbar} editor={editor} />
      <Tiptap {...tipTap} editor={editor} />
    </div>
  );
}

// define your extension array

export const Tiptap = ({
  className,
  editor,
  ...others
}: EditorContentProps) => {
  return <EditorContent className={className} editor={editor} {...others} />;
};

type ToolbarProps = {
  className?: string;
  editor: Editor | null;
  opt?: {
    textFormatting?: boolean;
    textAlignment?: boolean;
    headings?: boolean;
    lists?: boolean;
    undoRedo?: boolean;
  };

  handlers?: {
    onLinkClick?: () => string;
  };
};

export const Toolbar = ({ className, editor, opt, handlers }: ToolbarProps) => {
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
                        const x = editor.commands.setTextDirection("rtl");
                        console.log(x);
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

                    <ImageInputPopover>
                      <ImageUp />
                    </ImageInputPopover>

                    {handlers && !!handlers.onLinkClick && (
                      <Toggle
                        onClick={() => {
                          const url =
                            handlers?.onLinkClick && handlers?.onLinkClick();
                          if (url) {
                            editor.commands.setLink({
                              href: url,
                              target: "_blank",
                            });
                          }
                        }}
                        pressed={editor.isActive("link")}
                      >
                        <LinkIcon />
                      </Toggle>
                    )}

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
                    <Toggle
                      onClick={() => editor.chain().focus().undo().run()}
                      disabled={!editor.can().chain().focus().undo().run()}
                    >
                      <Undo2 />
                    </Toggle>
                    <Toggle
                      onClick={() => editor.chain().focus().redo().run()}
                      disabled={!editor.can().chain().focus().redo().run()}
                    >
                      <Redo2 />
                    </Toggle>
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
};

function ImageInputPopover({ children }: ImageInputPopoverProps) {
  const { acceptedFiles, getRootProps, getInputProps, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png", ".jpg", ".jpeg"],
      },
    });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 h-22">
        <div
          {...getRootProps()}
          className="w-full h-full relative flex flex-row-reverse items-center justify-between"
        >
          <Button type="button" variant="accent" size="sm">
            <span>انتخاب تصویر</span>
            <input
              {...getInputProps()}
              type="file"
              className="absolute inset-0 opacity-0"
            />
          </Button>

          <div
            className={cn(
              "text-xs truncate max-w-42",
              isDragReject && "text-red-500"
            )}
          >
            {(!isDragReject && acceptedFiles[0]?.name) ??
              "هیچ فایلی انتخاب نشده"}
            {isDragReject && "فرمت فایل انتخابی مجاز نیست"}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
