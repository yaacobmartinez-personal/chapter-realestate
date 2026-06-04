"use client";

import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormStatusProps {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  successMessage?: string;
}

export default function FormStatus({ status, error, successMessage }: FormStatusProps) {
  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-3 text-sm text-gray-500 font-light">
        <Loader2 size={15} className="animate-spin" />
        <span>Sending…</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 border border-green-200 bg-green-50 px-4 py-3">
        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-green-800 font-light">
          {successMessage ?? "Message sent. We'll be in touch within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3">
      <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-red-700 font-light">
        {error ?? "Something went wrong. Please try again."}
      </p>
    </div>
  );
}
