"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProcessStep } from "@chapter/db";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveStep, type SaveState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending}>{pending ? "Saving…" : "Save step"}</Button>;
}

export default function ProcessForm({ step }: { step?: ProcessStep }) {
  const s = step;
  const [state, formAction] = useActionState<SaveState, FormData>(saveStep, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/content/process" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold text-foreground">{s ? "Edit step" : "New step"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && <span className="text-sm text-red-600" role="alert">{state.error}</span>}
          <SubmitButton />
        </div>
      </div>

      {s && <input type="hidden" name="id" value={s.id} />}

      <div className="grid grid-cols-[120px_1fr] gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Step label</span>
          <input name="step" defaultValue={s?.step ?? ""} className={inputCls} placeholder="01" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Title</span>
          <input name="title" defaultValue={s?.title ?? ""} className={inputCls} placeholder="Initial Consultation" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Description</span>
        <textarea name="desc" rows={4} defaultValue={s?.desc ?? ""} className={inputCls} />
      </label>
      <label className="block max-w-[160px]">
        <span className="mb-1 block text-sm font-medium text-muted">Sort order</span>
        <input name="sortOrder" type="number" defaultValue={String(s?.sortOrder ?? 0)} className={inputCls} />
      </label>
    </form>
  );
}
