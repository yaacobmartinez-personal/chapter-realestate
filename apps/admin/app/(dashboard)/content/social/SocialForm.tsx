"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { SocialLink } from "@chapter/db";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveSocialLink, type SaveState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending}>{pending ? "Saving…" : "Save link"}</Button>;
}

export default function SocialForm({ link }: { link?: SocialLink }) {
  const s = link;
  const [state, formAction] = useActionState<SaveState, FormData>(saveSocialLink, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/content/social" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold text-foreground">{s ? "Edit link" : "New link"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && <span className="text-sm text-red-600" role="alert">{state.error}</span>}
          <SubmitButton />
        </div>
      </div>

      {s && <input type="hidden" name="id" value={s.id} />}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Platform name</span>
        <input name="name" defaultValue={s?.name ?? ""} className={inputCls} placeholder="Instagram" />
        <p className="mt-1 text-xs text-subtle">Instagram, Facebook, LinkedIn, and X have icons. Others show the first letter.</p>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">URL</span>
        <input name="href" type="url" defaultValue={s?.href ?? ""} className={inputCls} placeholder="https://instagram.com/chapterrealestate" />
      </label>
      <label className="flex items-center gap-2.5 text-sm text-foreground">
        <input type="checkbox" name="enabled" defaultChecked={s?.enabled ?? true} className="accent-accent" />
        Show on the website
      </label>
      <label className="block max-w-[160px]">
        <span className="mb-1 block text-sm font-medium text-muted">Sort order</span>
        <input name="sortOrder" type="number" defaultValue={String(s?.sortOrder ?? 0)} className={inputCls} />
      </label>
    </form>
  );
}
