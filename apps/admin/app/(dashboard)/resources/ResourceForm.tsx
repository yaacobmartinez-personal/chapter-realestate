"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { BlogPost, ContentBlock } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveBlogPost, type SaveState } from "./actions";
import { parseBody, serializeBody } from "./body";

type FormState = {
  title: string;
  tag: string;
  date: string;
  readTime: string;
  slug: string;
  excerpt: string;
  body: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : "Save article"}
    </Button>
  );
}

function PreviewBlock({ block, i }: { block: ContentBlock; i: number }) {
  if (block.type === "heading")
    return <h2 key={i} className="mb-3 mt-8 text-2xl font-light text-black">{block.text}</h2>;
  if (block.type === "list")
    return (
      <ul key={i} className="mb-5 space-y-2">
        {block.items.map((item, j) => (
          <li key={j} className="flex items-start gap-3 text-sm font-light text-gray-600">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    );
  return <p key={i} className="mb-5 text-sm font-light leading-relaxed text-gray-600">{block.text}</p>;
}

export default function ResourceForm({ post }: { post?: BlogPost }) {
  const [state, formAction] = useActionState<SaveState, FormData>(saveBlogPost, null);
  const [f, setF] = useState<FormState>(() => ({
    title: post?.title ?? "",
    tag: post?.tag ?? "",
    date: post?.date ?? "",
    readTime: post?.readTime ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    body: post ? serializeBody(post.body) : "",
  }));
  const [images, setImages] = useState<string[]>(post?.image ? [post.image] : []);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setF((prev) => ({ ...prev, [key]: e.target.value }));

  const cover = images[0];
  const blocks = parseBody(f.body);

  return (
    <form action={formAction} className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
      {/* Header bar: title + Save (top right) */}
      <div className="lg:col-span-2 sticky top-0 z-10 -mx-8 mb-2 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href="/resources"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {post ? "Edit article" : "New article"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && (
            <span className="text-sm text-red-600" role="alert">{state.error}</span>
          )}
          <SubmitButton />
        </div>
      </div>

      {/* ─── Editor ─────────────────────────────────────────── */}
      <div className="space-y-6">
        {post && <input type="hidden" name="originalSlug" value={post.slug} />}

        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted">Cover image</h2>
          <ImageUploader initial={post?.image ? [post.image] : []} onChange={setImages} />
        </section>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Title</span>
          <input name="title" value={f.title} onChange={set("title")} className={inputCls} />
        </label>

        <section className="grid grid-cols-3 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Tag</span>
            <input name="tag" value={f.tag} onChange={set("tag")} placeholder="Market Insights" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Date</span>
            <input name="date" value={f.date} onChange={set("date")} placeholder="March 2025" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Read time</span>
            <input name="readTime" value={f.readTime} onChange={set("readTime")} placeholder="5 min read" className={inputCls} />
          </label>
        </section>

        {!post && (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Slug (optional)</span>
            <input name="slug" value={f.slug} onChange={set("slug")} placeholder="auto-generated from title" className={inputCls} />
          </label>
        )}

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Excerpt</span>
          <textarea name="excerpt" rows={2} value={f.excerpt} onChange={set("excerpt")} className={inputCls} />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Body</span>
          <textarea name="body" rows={16} value={f.body} onChange={set("body")} className={`${inputCls} font-mono`} />
          <span className="mt-1 block text-xs text-muted">
            Use <code># </code> for a heading, <code>- </code> for list items, and blank lines
            between paragraphs.
          </span>
        </label>
      </div>

      {/* ─── Live preview (mirrors the public article) ──────── */}
      <aside className="lg:sticky lg:top-20 self-start">
        <p className="mb-3 text-sm font-semibold text-muted">Live preview</p>
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {/* Hero */}
          <div className="relative h-64 bg-black">
            {cover && (
              <Image src={cover} alt={f.title} fill className="object-cover opacity-40" sizes="700px" unoptimized />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-light">
                <span className="uppercase tracking-widest text-accent">{f.tag || "Tag"}</span>
                <span className="text-gray-500">·</span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Calendar size={11} />{f.date || "Date"}
                </span>
                <span className="text-gray-500">·</span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Clock size={11} />{f.readTime || "Read time"}
                </span>
              </div>
              <h1 className="text-3xl font-light leading-tight text-white">
                {f.title || "Article title"}
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="p-7">
            {f.excerpt && (
              <p className="mb-8 border-l-2 border-accent pl-5 text-lg font-light leading-relaxed text-gray-500">
                {f.excerpt}
              </p>
            )}
            {blocks.length > 0 ? (
              blocks.map((b, i) => <PreviewBlock key={i} block={b} i={i} />)
            ) : (
              <p className="text-sm font-light text-muted">Body will appear here…</p>
            )}

            {/* Article info card */}
            <div className="mt-8 rounded-xl bg-background p-6">
              <h3 className="mb-5 text-xs font-light uppercase tracking-widest text-gray-400">
                Article Info
              </h3>
              <dl className="space-y-3">
                <div className="flex items-center gap-3">
                  <Tag size={13} className="text-accent" />
                  <span className="text-sm font-light text-black">{f.tag || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={13} className="text-accent" />
                  <span className="text-sm font-light text-black">{f.date || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={13} className="text-accent" />
                  <span className="text-sm font-light text-black">{f.readTime || "—"}</span>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
