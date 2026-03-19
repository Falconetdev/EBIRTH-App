import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  HorizontalLine,
  HtmlEmbed,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersMathematical,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  WordCount,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

import type { BlogPost } from "@/types/blog";

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  coverFile: File | null;
};

type BlogFormProps = {
  initialValues?: Partial<BlogPost>;
  onSubmit: (values: BlogFormValues) => Promise<void> | void;
  submitLabel?: string;
  disableSlug?: boolean;
  isSubmitting?: boolean;
};

const defaultValues: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  coverFile: null,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const BlogForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save",
  disableSlug = false,
  isSubmitting = false,
}: BlogFormProps) => {
  const [values, setValues] = useState<BlogFormValues>(defaultValues);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({
        ...prev,
        ...initialValues,
        tags: initialValues.tags?.join(", ") ?? "",
        slug: initialValues.slug ?? prev.slug,
        coverFile: null,
      }));
      setCoverPreview(initialValues.coverUrl ?? null);
    } else {
      setValues(defaultValues);
      setCoverPreview(null);
    }
  }, [initialValues]);

  const handleChange = (field: keyof BlogFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((prev) => {
      if (field === "title" && !disableSlug) {
        return {
          ...prev,
          title: value,
          slug: slugify(value),
        };
      }

      return {
        ...prev,
        [field]: value,
      } as BlogFormValues;
    });
  };

  const handleSlugBlur = () => {
    if (disableSlug) return;
    setValues((prev) => ({
      ...prev,
      slug: slugify(prev.slug),
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((prev) => ({
      ...prev,
      coverFile: file,
    }));

    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const coverLabel = useMemo(() => (coverPreview ? "Change cover" : "Upload cover"), [coverPreview]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Title</label>
          <input
            value={values.title}
            onChange={handleChange("title")}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="Enter blog title"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Slug</label>
          <input
            value={values.slug}
            onChange={handleChange("slug")}
            onBlur={handleSlugBlur}
            required
            disabled={disableSlug}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 disabled:bg-white/5 disabled:text-white/40 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="unique-post-slug"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Excerpt</label>
          <textarea
            value={values.excerpt}
            onChange={handleChange("excerpt")}
            required
            rows={4}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="Short teaser for listings"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Tags (comma separated)</label>
          <textarea
            value={values.tags}
            onChange={handleChange("tags")}
            rows={4}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="trading, strategy, crypto"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/85">Content</label>
        <div className="ck-editor-wrapper overflow-hidden rounded-2xl border border-white/15">
          <CKEditor
            editor={ClassicEditor}
            data={values.content}
            onChange={(_, editor) => {
              const data = editor.getData();
              setValues((prev) => ({
                ...prev,
                content: data,
              }));
            }}
            config={{
              licenseKey: "GPL",
              plugins: [
                Alignment,
                AutoLink,
                Autosave,
                BlockQuote,
                Bold,
                Code,
                CodeBlock,
                Essentials,
                FindAndReplace,
                FontBackgroundColor,
                FontColor,
                FontFamily,
                FontSize,
                Heading,
                HorizontalLine,
                HtmlEmbed,
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                ListProperties,
                MediaEmbed,
                Paragraph,
                RemoveFormat,
                SpecialCharacters,
                SpecialCharactersArrows,
                SpecialCharactersCurrency,
                SpecialCharactersEssentials,
                SpecialCharactersMathematical,
                Strikethrough,
                Subscript,
                Superscript,
                Table,
                TableCaption,
                TableCellProperties,
                TableColumnResize,
                TableProperties,
                TableToolbar,
                TodoList,
                Underline,
                WordCount,
              ],
              toolbar: {
                items: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "subscript",
                  "superscript",
                  "removeFormat",
                  "|",
                  "fontFamily",
                  "fontSize",
                  "fontColor",
                  "fontBackgroundColor",
                  "|",
                  "alignment",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "todoList",
                  "indent",
                  "outdent",
                  "|",
                  "link",
                  "blockQuote",
                  "insertTable",
                  "mediaEmbed",
                  "horizontalLine",
                  "|",
                  "code",
                  "codeBlock",
                  "htmlEmbed",
                  "specialCharacters",
                  "|",
                  "findAndReplace",
                  "undo",
                  "redo",
                ],
                shouldNotGroupWhenFull: true,
              },
              heading: {
                options: [
                  { model: "paragraph" as const, title: "Paragraph", class: "ck-heading_paragraph" },
                  { model: "heading1" as const, view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                  { model: "heading2" as const, view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                  { model: "heading3" as const, view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                  { model: "heading4" as const, view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
                ],
              },
              fontFamily: {
                supportAllValues: true,
              },
              fontSize: {
                options: [10, 12, 14, "default", 18, 20, 24, 28, 32, 36],
                supportAllValues: true,
              },
              table: {
                contentToolbar: [
                  "tableColumn",
                  "tableRow",
                  "mergeTableCells",
                  "tableProperties",
                  "tableCellProperties",
                ],
              },
              list: {
                properties: {
                  styles: true,
                  startIndex: true,
                  reversed: true,
                },
              },
              link: {
                defaultProtocol: "https://",
                addTargetToExternalLinks: true,
              },
              placeholder: "Write or paste the full article body…",
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/85">Cover image</label>
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-white/25 bg-white/5 p-4">
          {coverPreview ? (
            <img src={coverPreview} alt="Cover preview" className="h-32 w-full rounded-xl object-cover" />
          ) : (
            <p className="text-sm text-white/60">No image selected</p>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#6E21FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5820DA]">
            {coverLabel}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-xl bg-[#FFE500] px-6 py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
