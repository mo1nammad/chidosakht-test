import React from "react";
// import LinkExt from "@tiptap/extension-link";
// import ImageExt from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
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
  Text,
  AlignCenter,
  AlignLeft,
  AlignRight,
  // PaintBucket,
} from "lucide-react";

import { cn } from "@/lib/utils";
// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  EditorContentProps,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Card } from "./ui/card";
import { Toggle } from "./ui/toggle";

import "./text-editor.css";
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
      StarterKit.configure(),
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      // LinkExt.configure({ openOnClick: true }),
      // ImageExt.configure({ inline: true }),
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
};

export const Toolbar = ({ className, editor }: ToolbarProps) => {
  if (!editor) return null;
  return (
    <Card className={cn("text-left flex flex-wrap gap-2 p-2", className)}>
      <Toggle
        onClick={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive("bold")}
      >
        <Bold />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive("italic")}
      >
        <Italic />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleStrike().run()}
        pressed={editor.isActive("strike")}
      >
        <Strikethrough />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleCode().run()}
        pressed={editor.isActive("code")}
      >
        <Code />
      </Toggle>

      <Toggle
        onClick={() => editor.chain().focus().setParagraph().run()}
        pressed={editor.isActive("paragraph")}
      >
        <Text />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        pressed={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        pressed={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        pressed={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        pressed={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        pressed={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        pressed={editor.isActive("heading", { level: 3 })}
      >
        <Heading3 />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        pressed={editor.isActive("heading", { level: 4 })}
      >
        <Heading4 />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        pressed={editor.isActive("heading", { level: 5 })}
      >
        <Heading5 />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        pressed={editor.isActive("heading", { level: 6 })}
      >
        <Heading6 />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive("bulletList")}
      >
        <List />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive("orderedList")}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive("blockquote")}
      >
        <Quote />
      </Toggle>
      <Toggle onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <SeparatorHorizontal />
      </Toggle>
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
      {/* <Toggle
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        pressed={editor.isActive("textStyle", { color: "#958DF1" })}
      >
        <PaintBucket />
      </Toggle> */}
    </Card>
  );
};
