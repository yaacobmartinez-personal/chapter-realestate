"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Property } from "@chapter/db";
import ImageUploader from "@/components/ImageUploader";
import { saveProperty, type SaveState } from "./actions";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input type={type} name={name} defaultValue={defaultValue} className={inputCls} />
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-foreground px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save property"}
    </button>
  );
}

export default function PropertyForm({ property }: { property?: Property }) {
  const p = property;
  const [state, formAction] = useActionState<SaveState, FormData>(saveProperty, null);

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {p && <input type="hidden" name="id" value={p.id} />}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted">Images</h2>
        <ImageUploader initial={p?.images ?? []} />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Field label="Address" name="address" defaultValue={p?.address} />
        <Field label="Slug (optional)" name="slug" defaultValue={p?.slug} />
        <Field label="Price" name="price" defaultValue={p?.price} />
        <Field label="MLS #" name="mls" defaultValue={p?.mls} />
        <Field label="Area / Neighbourhood" name="area" defaultValue={p?.area} />
        <Field label="Tag (e.g. New, Featured)" name="tag" defaultValue={p?.tag} />
        <Field label="City" name="city" defaultValue={p?.city} />
        <Field label="Province" name="province" defaultValue={p?.province} />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Type</span>
          <select name="type" defaultValue={p?.type ?? "Residential"} className={inputCls}>
            <option>Residential</option>
            <option>Luxury</option>
            <option>Investment</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Status</span>
          <select name="status" defaultValue={p?.status ?? "For Sale"} className={inputCls}>
            <option>For Sale</option>
            <option>Pending</option>
            <option>Sold</option>
          </select>
        </label>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <Field label="Beds" name="beds" type="number" defaultValue={p?.beds} />
        <Field label="Baths" name="baths" type="number" defaultValue={p?.baths} />
        <Field label="Garage" name="garage" type="number" defaultValue={p?.garage} />
        <Field label="Sqft" name="sqft" defaultValue={p?.sqft} />
        <Field label="Lot" name="lot" defaultValue={p?.lot} />
        <Field label="Year built" name="yearBuilt" type="number" defaultValue={p?.yearBuilt} />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Field label="Longitude" name="lng" type="number" defaultValue={p?.coordinates.lng} />
        <Field label="Latitude" name="lat" type="number" defaultValue={p?.coordinates.lat} />
      </section>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Description</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={p?.description}
          className={inputCls}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Features (one per line)</span>
        <textarea
          name="features"
          rows={5}
          defaultValue={p?.features.join("\n")}
          className={inputCls}
        />
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
