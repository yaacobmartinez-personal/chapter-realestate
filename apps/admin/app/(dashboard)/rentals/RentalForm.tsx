"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Bed, Bath, Square } from "lucide-react";
import type { RentalUnit } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveRental, type SaveState } from "./actions";

type FormState = {
  rent: string;
  address: string;
  area: string;
  beds: string;
  baths: string;
  sqft: string;
  category: string;
  status: string;
};

function initialState(r?: RentalUnit): FormState {
  return {
    rent: r?.rent ?? "",
    address: r?.address ?? "",
    area: r?.area ?? "",
    beds: String(r?.beds ?? ""),
    baths: String(r?.baths ?? ""),
    sqft: r?.sqft ?? "",
    category: r?.category ?? "Residential",
    status: r?.status ?? "Available",
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
      {pending ? "Saving…" : "Save rental"}
    </Button>
  );
}

export default function RentalForm({ rental }: { rental?: RentalUnit }) {
  const r = rental;
  const [state, formAction] = useActionState<SaveState, FormData>(saveRental, null);
  const [f, setF] = useState<FormState>(() => initialState(r));
  const initialImages = r?.images?.length ? r.images : r?.image ? [r.image] : [];
  const [images, setImages] = useState<string[]>(initialImages);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setF((prev) => ({ ...prev, [key]: e.target.value }));

  const photo = images[0];
  const isResidential = f.category === "Residential";

  return (
    <form action={formAction} className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
      {/* Header bar */}
      <div className="lg:col-span-2 sticky top-0 z-10 -mx-8 mb-2 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href="/rentals"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {r ? "Edit rental" : "New rental"}
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
        {r && <input type="hidden" name="id" value={r.id} />}

        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted">Photos</h2>
          <ImageUploader initial={initialImages} onChange={setImages} />
          <p className="mt-2 text-xs text-muted">The first photo is the main image shown on cards.</p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Address / Title" name="address" value={f.address} onChange={set("address")} placeholder="Unit — Osborne Village" />
          <Field label="Area / Neighbourhood" name="area" value={f.area} onChange={set("area")} placeholder="Osborne Village" />
          <Field label="Rent (e.g. $1,650/mo or $18/sqft)" name="rent" value={f.rent} onChange={set("rent")} placeholder="$1,650/mo" />
          <Field label="Sqft" name="sqft" value={f.sqft} onChange={set("sqft")} placeholder="850" />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Category</span>
            <select name="category" value={f.category} onChange={set("category")} className={inputCls}>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Status</span>
            <select name="status" value={f.status} onChange={set("status")} className={inputCls}>
              <option>Available</option>
              <option>Leased</option>
            </select>
          </label>
          <Field label="Beds" name="beds" type="number" value={f.beds} onChange={set("beds")} placeholder="0" />
          <Field label="Baths" name="baths" type="number" value={f.baths} onChange={set("baths")} placeholder="0" />
        </section>
      </div>

      {/* Live preview — mirrors the public rental card */}
      <aside className="lg:sticky lg:top-8 self-start">
        <p className="mb-3 text-sm font-semibold text-muted">Live preview</p>
        <div className="max-w-sm overflow-hidden border border-gray-200 bg-white">
          <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
            {photo && <Image src={photo} alt={f.address || "Rental"} fill className="object-cover" sizes="384px" unoptimized />}
            <span className="absolute left-4 top-4 bg-black px-3 py-1.5 text-xs font-light uppercase tracking-widest text-white">
              {f.category}
            </span>
            <span className="absolute right-4 top-4 bg-[#c8a96e] px-3 py-1.5 text-xs font-light uppercase tracking-widest text-black">
              {f.status}
            </span>
          </div>
          <div className="p-6">
            <p className="mb-2 text-2xl font-light text-black">{f.rent || "$—"}</p>
            <p className="mb-1 text-sm font-light text-gray-700">{f.address || "Address"}</p>
            <p className="mb-4 flex items-center gap-1 text-xs font-light text-gray-400">
              <MapPin size={11} /> {f.area || "Area"}, Winnipeg
            </p>
            <div className="flex gap-4 border-t border-gray-100 pt-4 text-xs font-light text-gray-500">
              {isResidential && (
                <>
                  <span className="flex items-center gap-1"><Bed size={12} /> {f.beds || "0"}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Bath size={12} /> {f.baths || "0"}</span>
                  <span>·</span>
                </>
              )}
              <span className="flex items-center gap-1"><Square size={12} /> {f.sqft || "—"} sqft</span>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
