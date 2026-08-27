"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { TeamMember } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveTeamMember, type SaveState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending}>{pending ? "Saving…" : "Save member"}</Button>;
}

export default function LeadershipForm({ member }: { member?: TeamMember }) {
  const m = member;
  const [state, formAction] = useActionState<SaveState, FormData>(saveTeamMember, null);
  const initialImages = m?.image ? [m.image] : [];

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/content/leadership" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold text-foreground">{m ? "Edit member" : "New member"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && <span className="text-sm text-red-600" role="alert">{state.error}</span>}
          <SubmitButton />
        </div>
      </div>

      {m && <input type="hidden" name="id" value={m.id} />}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted">Headshot</h2>
        <ImageUploader initial={initialImages} folder="leadership" onChange={() => {}} />
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Name</span>
        <input name="name" defaultValue={m?.name ?? ""} className={inputCls} placeholder="Armin Barsomian" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Role</span>
        <input name="role" defaultValue={m?.role ?? ""} className={inputCls} placeholder="Founder & Managing Partner" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-muted">Bio</span>
        <textarea name="bio" rows={4} defaultValue={m?.bio ?? ""} className={inputCls} />
      </label>
      <label className="block max-w-[160px]">
        <span className="mb-1 block text-sm font-medium text-muted">Sort order</span>
        <input name="sortOrder" type="number" defaultValue={String(m?.sortOrder ?? 0)} className={inputCls} />
      </label>
    </form>
  );
}
