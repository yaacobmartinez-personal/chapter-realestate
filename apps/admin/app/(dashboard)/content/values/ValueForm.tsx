"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CompanyValue } from "@chapter/db";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveValue, type SaveState } from "./actions";

// Icons supported by the public Values section (see components/about/Values.tsx).
const ICONS = ["Heart", "Lightbulb", "Users", "Award", "TrendingUp", "Zap"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending}>{pending ? "Saving…" : "Save value"}</Button>;
}

export default function ValueForm({ value }: { value?: CompanyValue }) {
  const v = value;
  const [state, formAction] = useActionState<SaveState, FormData>(saveValue, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/content/values" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold text-foreground">{v ? "Edit value" : "New value"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && <span className="text-sm text-red-600" role="alert">{state.error}</span>}
          <SubmitButton />
        </div>
      </div>

      {v && <input type="hidden" name="id" value={v.id} />}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Title</span>
        <input name="title" defaultValue={v?.title ?? ""} className={inputCls} placeholder="Put People First" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Icon</span>
        <select name="iconKey" defaultValue={v?.iconKey ?? "Heart"} className={inputCls}>
          {ICONS.map((i) => <option key={i}>{i}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Description</span>
        <textarea name="description" rows={4} defaultValue={v?.description ?? ""} className={inputCls} />
      </label>
      <label className="block max-w-[160px]">
        <span className="mb-1 block text-sm font-medium text-muted">Sort order</span>
        <input name="sortOrder" type="number" defaultValue={String(v?.sortOrder ?? 0)} className={inputCls} />
      </label>
    </form>
  );
}
