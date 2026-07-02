"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MissionVisionItem } from "@chapter/db";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveMissionVision, type SaveState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending}>{pending ? "Saving…" : "Save statement"}</Button>;
}

export default function MissionVisionForm({ item }: { item?: MissionVisionItem }) {
  const m = item;
  const [state, formAction] = useActionState<SaveState, FormData>(saveMissionVision, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/content/mission-vision" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold text-foreground">{m ? "Edit statement" : "New statement"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && <span className="text-sm text-red-600" role="alert">{state.error}</span>}
          <SubmitButton />
        </div>
      </div>

      {m && <input type="hidden" name="id" value={m.id} />}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Label</span>
        <input name="label" defaultValue={m?.label ?? ""} className={inputCls} placeholder="Our Mission" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Heading</span>
        <textarea name="heading" rows={2} defaultValue={m?.heading ?? ""} className={inputCls} placeholder="To simplify real estate…" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Body</span>
        <textarea name="body" rows={4} defaultValue={m?.body ?? ""} className={inputCls} />
      </label>
      <label className="block max-w-[160px]">
        <span className="mb-1 block text-sm font-medium text-muted">Sort order</span>
        <input name="sortOrder" type="number" defaultValue={String(m?.sortOrder ?? 0)} className={inputCls} />
        <p className="mt-1 text-xs text-subtle">First shows as a light block, second as dark.</p>
      </label>
    </form>
  );
}
