"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { createUser, type CreateState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Creating…" : "Create user"}
    </Button>
  );
}

export default function CreateUserForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, action] = useActionState<CreateState, FormData>(createUser, null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state && "ok" in state) {
      formRef.current?.reset();
      toast({ tone: "success", message: "User created." });
      onSuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form ref={formRef} action={action}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email" required>
          <Input name="email" type="email" required />
        </Field>
        <Field label="Full name">
          <Input name="full_name" />
        </Field>
        <Field label="Temporary password" required help="Minimum 6 characters.">
          <Input name="password" type="text" required />
        </Field>
        <Field label="Role">
          <Select name="role" defaultValue="tenant">
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="tenant">Tenant</option>
          </Select>
        </Field>
        <Field label="Status">
          <Select name="status" defaultValue="approved">
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </Select>
        </Field>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <SubmitButton />
        {state && "error" in state && (
          <span className="text-sm text-danger" role="alert">{state.error}</span>
        )}
      </div>
    </form>
  );
}
