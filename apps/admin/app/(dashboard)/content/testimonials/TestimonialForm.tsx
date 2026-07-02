"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Testimonial } from "@chapter/db";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveTestimonial, type SaveState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending}>{pending ? "Saving…" : "Save testimonial"}</Button>;
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const t = testimonial;
  const [state, formAction] = useActionState<SaveState, FormData>(saveTestimonial, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/content/testimonials" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold text-foreground">{t ? "Edit testimonial" : "New testimonial"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && <span className="text-sm text-red-600" role="alert">{state.error}</span>}
          <SubmitButton />
        </div>
      </div>

      {t && <input type="hidden" name="id" value={t.id} />}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Quote</span>
        <textarea name="text" rows={4} defaultValue={t?.text ?? ""} className={inputCls} placeholder="Chapter made selling our home effortless…" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Author</span>
        <input name="author" defaultValue={t?.author ?? ""} className={inputCls} placeholder="David & Karen T." />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Context</span>
        <input name="context" defaultValue={t?.context ?? ""} className={inputCls} placeholder="Sellers, River Heights" />
      </label>
      <label className="block max-w-[160px]">
        <span className="mb-1 block text-sm font-medium text-muted">Sort order</span>
        <input name="sortOrder" type="number" defaultValue={String(t?.sortOrder ?? 0)} className={inputCls} />
      </label>
    </form>
  );
}
