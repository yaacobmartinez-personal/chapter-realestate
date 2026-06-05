"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { BlogPost } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import { saveBlogPost, type SaveState } from "./actions";
import { serializeBody } from "./body";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input name={name} defaultValue={defaultValue} placeholder={placeholder} className={inputCls} />
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-foreground px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save article"}
    </button>
  );
}

export default function ResourceForm({ post }: { post?: BlogPost }) {
  const [state, formAction] = useActionState<SaveState, FormData>(saveBlogPost, null);

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {post && <input type="hidden" name="originalSlug" value={post.slug} />}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted">Cover image</h2>
        <ImageUploader initial={post?.image ? [post.image] : []} />
      </section>

      <Field label="Title" name="title" defaultValue={post?.title} />

      <section className="grid grid-cols-3 gap-4">
        <Field label="Tag" name="tag" defaultValue={post?.tag} placeholder="Market Insights" />
        <Field label="Date" name="date" defaultValue={post?.date} placeholder="March 2025" />
        <Field label="Read time" name="readTime" defaultValue={post?.readTime} placeholder="5 min read" />
      </section>

      {!post && <Field label="Slug (optional)" name="slug" placeholder="auto-generated from title" />}

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Excerpt</span>
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} className={inputCls} />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Body</span>
        <textarea
          name="body"
          rows={16}
          defaultValue={post ? serializeBody(post.body) : ""}
          className={`${inputCls} font-mono`}
        />
        <span className="mt-1 block text-xs text-muted">
          Use <code># </code> for a heading, <code>- </code> for list items, and blank lines
          between paragraphs.
        </span>
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
