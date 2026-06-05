"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { login, type LoginState } from "./actions";
import Button from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

function ForbiddenNotice() {
  const params = useSearchParams();
  if (params.get("error") !== "forbidden") return null;
  return (
    <p className="mb-4 rounded-lg bg-warning-surface px-3 py-2 text-sm text-warning">
      Sign in with an approved admin account to access the CMS.
    </p>
  );
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, null);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <Image
          src="/logo.png"
          alt="Chapter"
          width={150}
          height={50}
          className="mb-6 h-9 w-auto object-contain dark:invert"
          priority
        />
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Sign in</h1>
        <p className="mb-6 mt-1 text-sm text-muted">Manage content for Chapter Real Estate.</p>

        <Suspense fallback={null}>
          <ForbiddenNotice />
        </Suspense>

        <form action={formAction} className="space-y-4">
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </Field>
          <Field label="Password" htmlFor="password" error={state?.error}>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </Field>

          <Button type="submit" loading={pending} className="w-full">
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
