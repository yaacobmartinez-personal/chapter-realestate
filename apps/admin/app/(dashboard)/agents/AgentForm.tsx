"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import type { Agent } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveAgent, type SaveState } from "./actions";

type FormState = {
  name: string;
  specialties: string;
  phone: string;
  email: string;
  listings: string;
};

function initialState(a?: Agent): FormState {
  return {
    name: a?.name ?? "",
    specialties: a?.specialties ?? "",
    phone: a?.phone ?? "",
    email: a?.email ?? "",
    listings: String(a?.listings ?? ""),
  };
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-muted">{label}</span>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={inputCls} />
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : "Save agent"}
    </Button>
  );
}

export default function AgentForm({ agent }: { agent?: Agent }) {
  const a = agent;
  const [state, formAction] = useActionState<SaveState, FormData>(saveAgent, null);
  const [f, setF] = useState<FormState>(() => initialState(a));
  const [images, setImages] = useState<string[]>(a?.image ? [a.image] : []);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));

  const photo = images[0];

  return (
    <form action={formAction} className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
      {/* Header bar */}
      <div className="lg:col-span-2 sticky top-0 z-10 -mx-8 mb-2 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href="/agents"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {a ? "Edit agent" : "New agent"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {state?.error && (
            <span className="text-sm text-red-600" role="alert">
              {state.error}
            </span>
          )}
          <SubmitButton />
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-6">
        {a && <input type="hidden" name="id" value={a.id} />}

        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted">Headshot</h2>
          <ImageUploader initial={a?.image ? [a.image] : []} folder="agents" onChange={setImages} />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" value={f.name} onChange={set("name")} placeholder="Jane Doe" />
          <Field label="Specialty / Title" name="specialties" value={f.specialties} onChange={set("specialties")} placeholder="Residential Sales" />
          <Field label="Phone" name="phone" type="tel" value={f.phone} onChange={set("phone")} placeholder="204-000-0000" />
          <Field label="Email" name="email" type="email" value={f.email} onChange={set("email")} placeholder="agent@chapterrealestate.ca" />
          <Field label="Active listings" name="listings" type="number" value={f.listings} onChange={set("listings")} placeholder="0" />
        </section>
      </div>

      {/* Live preview — mirrors the public agent card */}
      <aside className="lg:sticky lg:top-8 self-start">
        <p className="mb-3 text-sm font-semibold text-muted">Live preview</p>
        <div className="max-w-xs overflow-hidden border border-gray-200 bg-white">
          <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
            {photo && <Image src={photo} alt={f.name || "Agent"} fill className="object-cover grayscale" sizes="320px" unoptimized />}
          </div>
          <div className="p-5">
            <p className="text-sm font-light text-black">{f.name || "Agent Name"}</p>
            <p className="mb-3 mt-1 text-xs font-light text-[#c8a96e]">{f.specialties || "Specialty"}</p>
            <p className="mb-1 mt-3 text-xs font-light text-gray-400">{f.listings || "0"} Active Listings</p>
            <div className="mt-4 flex gap-2">
              <span className="flex flex-1 items-center justify-center gap-1 border border-gray-200 py-2 text-xs font-light text-gray-500">
                <Phone size={11} /> Call
              </span>
              <span className="flex flex-1 items-center justify-center gap-1 border border-gray-200 py-2 text-xs font-light text-gray-500">
                <Mail size={11} /> Email
              </span>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
