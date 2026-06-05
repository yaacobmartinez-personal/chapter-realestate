"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, Calendar, Hash, Check } from "lucide-react";
import type { Property } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import PreviewCarousel from "@/components/PreviewCarousel";
import Button from "@/components/ui/Button";
import { controlCls as inputCls } from "@/components/ui/Field";
import { saveProperty, type SaveState } from "./actions";

type FormState = {
  slug: string;
  address: string;
  price: string;
  mls: string;
  area: string;
  tag: string;
  city: string;
  province: string;
  type: string;
  status: string;
  beds: string;
  baths: string;
  garage: string;
  sqft: string;
  lot: string;
  yearBuilt: string;
  lng: string;
  lat: string;
  description: string;
  features: string;
};

function initialState(p?: Property): FormState {
  return {
    slug: p?.slug ?? "",
    address: p?.address ?? "",
    price: p?.price ?? "",
    mls: p?.mls ?? "",
    area: p?.area ?? "",
    tag: p?.tag ?? "",
    city: p?.city ?? "",
    province: p?.province ?? "",
    type: p?.type ?? "Residential",
    status: p?.status ?? "For Sale",
    beds: String(p?.beds ?? ""),
    baths: String(p?.baths ?? ""),
    garage: String(p?.garage ?? ""),
    sqft: p?.sqft ?? "",
    lot: p?.lot ?? "",
    yearBuilt: String(p?.yearBuilt ?? ""),
    lng: String(p?.coordinates.lng ?? ""),
    lat: String(p?.coordinates.lat ?? ""),
    description: p?.description ?? "",
    features: p?.features.join("\n") ?? "",
  };
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-muted">{label}</span>
      <input type={type} name={name} value={value} onChange={onChange} className={inputCls} />
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : "Save property"}
    </Button>
  );
}

export default function PropertyForm({ property }: { property?: Property }) {
  const p = property;
  const [state, formAction] = useActionState<SaveState, FormData>(saveProperty, null);
  const [f, setF] = useState<FormState>(() => initialState(p));
  const [images, setImages] = useState<string[]>(p?.images ?? []);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setF((prev) => ({ ...prev, [key]: e.target.value }));

  const featureList = f.features.split("\n").map((x) => x.trim()).filter(Boolean);

  return (
    <form action={formAction} className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
      {/* ─── Header bar: title + Save (top right) ───────────── */}
      <div className="lg:col-span-2 sticky top-0 z-10 -mx-8 mb-2 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-8 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href="/properties"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <ArrowLeft size={15} /> Back
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {p ? "Edit property" : "New property"}
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

      {/* ─── Editor ─────────────────────────────────────────── */}
      <div className="space-y-6">
        {p && <input type="hidden" name="id" value={p.id} />}

        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted">Images</h2>
          <ImageUploader initial={p?.images ?? []} onChange={setImages} />
        </section>

        <section className="grid grid-cols-2 gap-4">
          <Field label="Address" name="address" value={f.address} onChange={set("address")} />
          <Field label="Slug (optional)" name="slug" value={f.slug} onChange={set("slug")} />
          <Field label="Price" name="price" value={f.price} onChange={set("price")} />
          <Field label="MLS® Number" name="mls" value={f.mls} onChange={set("mls")} />
          <Field label="Area / Neighbourhood" name="area" value={f.area} onChange={set("area")} />
          <Field label="Tag (e.g. New, Featured)" name="tag" value={f.tag} onChange={set("tag")} />
          <Field label="City" name="city" value={f.city} onChange={set("city")} />
          <Field label="Province" name="province" value={f.province} onChange={set("province")} />
        </section>

        <section className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Type</span>
            <select name="type" value={f.type} onChange={set("type")} className={inputCls}>
              <option>Residential</option>
              <option>Luxury</option>
              <option>Investment</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-muted">Status</span>
            <select name="status" value={f.status} onChange={set("status")} className={inputCls}>
              <option>For Sale</option>
              <option>Pending</option>
              <option>Sold</option>
            </select>
          </label>
        </section>

        <section className="grid grid-cols-3 gap-4">
          <Field label="Beds" name="beds" type="number" value={f.beds} onChange={set("beds")} />
          <Field label="Baths" name="baths" type="number" value={f.baths} onChange={set("baths")} />
          <Field label="Garage" name="garage" type="number" value={f.garage} onChange={set("garage")} />
          <Field label="Sqft" name="sqft" value={f.sqft} onChange={set("sqft")} />
          <Field label="Lot" name="lot" value={f.lot} onChange={set("lot")} />
          <Field label="Year built" name="yearBuilt" type="number" value={f.yearBuilt} onChange={set("yearBuilt")} />
        </section>

        <section className="grid grid-cols-2 gap-4">
          <Field label="Longitude" name="lng" type="number" value={f.lng} onChange={set("lng")} />
          <Field label="Latitude" name="lat" type="number" value={f.lat} onChange={set("lat")} />
        </section>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Description</span>
          <textarea
            name="description"
            rows={5}
            value={f.description}
            onChange={set("description")}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-muted">Features (one per line)</span>
          <textarea
            name="features"
            rows={5}
            value={f.features}
            onChange={set("features")}
            className={inputCls}
          />
        </label>

      </div>

      {/* ─── Live preview (mirrors the public listing) ──────── */}
      <aside className="lg:sticky lg:top-8 self-start">
        <p className="mb-3 text-sm font-semibold text-muted">Live preview</p>
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {/* Hero carousel */}
          <PreviewCarousel images={images} tag={f.tag} alt={f.address || "Property"} />

          {/* Body */}
          <div className="p-7">
            <p className="mb-2 text-xs font-light uppercase tracking-[0.25em] text-accent">
              {f.type}
            </p>
            <h1 className="mb-2 text-4xl font-light text-black">{f.price || "$—"}</h1>
            <p className="mb-1 text-lg font-light text-gray-700">{f.address || "Address"}</p>
            <p className="mb-8 flex items-center gap-1 text-sm font-light text-gray-400">
              <MapPin size={13} /> {[f.area, f.city, f.province].filter(Boolean).join(", ")}
            </p>

            {/* Stats */}
            <div className="mb-8 grid grid-cols-4 gap-4 border-y border-gray-100 py-6">
              {[
                { icon: Bed, label: "Beds", value: f.beds || "0" },
                { icon: Bath, label: "Baths", value: f.baths || "0" },
                { icon: Square, label: "Sqft", value: f.sqft || "—" },
                { icon: Car, label: "Garage", value: `${f.garage || "0"} car` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="mx-auto mb-2 text-accent" />
                  <p className="text-lg font-light text-black">{value}</p>
                  <p className="mt-0.5 text-xs font-light text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 className="mb-3 text-lg font-light text-black">About This Property</h2>
            <p className="mb-8 whitespace-pre-wrap text-sm font-light leading-relaxed text-gray-600">
              {f.description || "Description will appear here…"}
            </p>

            {/* Features */}
            {featureList.length > 0 && (
              <>
                <h2 className="mb-4 text-lg font-light text-black">Features &amp; Highlights</h2>
                <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {featureList.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm font-light text-gray-600">
                      <Check size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Details */}
            <div className="rounded-xl bg-background p-6">
              <h3 className="mb-5 text-sm font-light uppercase tracking-widest text-gray-400">
                Property Details
              </h3>
              <dl className="space-y-3">
                {[
                  { icon: Calendar, label: "Year Built", value: f.yearBuilt || "—" },
                  { icon: Square, label: "Lot Size", value: f.lot || "—" },
                  { icon: Hash, label: "MLS®", value: f.mls || "—" },
                  { icon: MapPin, label: "Neighbourhood", value: f.area || "—" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-light text-gray-400">
                      <Icon size={13} /> {label}
                    </span>
                    <span className="text-sm font-light text-black">{value}</span>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
