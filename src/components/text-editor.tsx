import React from "react";
import { useEditor, EditorContent, EditorContentProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextDirection from "tiptap-text-direction";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import { cn } from "@/lib/utils";
import { Toolbar, ToolbarProps } from "./text-editor-toolbar";
// src/Tiptap.tsx

import "./text-editor.css";
type Props = {
  className?: string;
  toolbar?: Omit<ToolbarProps, "editor">;
  tipTap?: Omit<EditorContentProps, "editor">;
  value?: string;
  onChange: (content: string) => void;
  onBlur: () => void;
};

export default function TextEditor({
  className,
  tipTap,
  toolbar,
  onBlur,
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    content: value,
    onBlur,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
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
    immediatelyRender: false,
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
