import { cn } from "@/lib/utils";
import React from "react";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  EditorContentProps,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "./ui/card";

type Props = {
  className?: string;
  toolbar?: {
    className?: string;
  };
  tipTap?: {
    className?: string;
  };
};

export default function TextEditor({ className, tipTap, toolbar }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExt.configure({ openOnClick: true }),
      ImageExt.configure({ inline: true }),
    ],
  });
  return (
    <div className={cn("space-y-2.5", className)}>
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
  return (
    <Card className={cn("border rounded-lg p-4", className)}>
      {editor && <EditorContent editor={editor} {...others} />}
    </Card>
  );
};

type ToolbarProps = {
  className?: string;
  editor: Editor | null;
};

export const Toolbar = ({ className, editor }: ToolbarProps) => {
  if (!editor) return null;
  return (
    <Card className={cn("", className)}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded border ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded border ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="px-3 py-1 rounded border"
      >
        Bullet List
      </button>
    </Card>
  );
};
