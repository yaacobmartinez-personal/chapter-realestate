"use client";
import { createContext, useContext, useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface EditorContextValue {
  isEditing: boolean;
  password: string;
  activeSection: string;
  setActiveSection: (s: string) => void;
  content: Record<string, unknown>;
  pendingContent: Record<string, unknown>;
  updateField: (section: string, path: string, value: unknown) => void;
  save: () => Promise<void>;
  discard: () => void;
  isSaving: boolean;
  isDirty: boolean;
  exitEditor: () => void;
  loadSection: (section: string) => Promise<void>;
}

const EditorContext = createContext<EditorContextValue | null>(null);

// Watches for ?edit=password in the URL
function EditorParamWatcher({ onActivate }: { onActivate: (pw: string) => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const editParam = searchParams.get("edit");
    if (editParam) {
      onActivate(editParam);
      // clean URL
      router.replace(pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [pendingContent, setPendingContent] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);

  // On mount, check sessionStorage
  useEffect(() => {
    const active = sessionStorage.getItem("chapter_editor_active");
    const pw = sessionStorage.getItem("chapter_editor_password");
    if (active === "1" && pw) {
      setIsEditing(true);
      setPassword(pw);
    }
  }, []);

  const activateEditor = useCallback(async (pw: string) => {
    const res = await fetch("/api/editor/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const { valid } = await res.json();
    if (valid) {
      sessionStorage.setItem("chapter_editor_active", "1");
      sessionStorage.setItem("chapter_editor_password", pw);
      setPassword(pw);
      setIsEditing(true);
    }
  }, []);

  const loadSection = useCallback(async (section: string) => {
    if ((content as Record<string, unknown>)[section]) return; // already loaded
    const res = await fetch(`/api/content/${section}`);
    const data = await res.json();
    setContent((prev) => ({ ...prev, [section]: data }));
    setPendingContent((prev) => ({ ...prev, [section]: data }));
  }, [content]);

  // Load active section when it changes
  useEffect(() => {
    if (isEditing) loadSection(activeSection);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, activeSection]);

  // dot-notation deep update utility
  const updateField = useCallback((section: string, path: string, value: unknown) => {
    setPendingContent((prev) => {
      const updated = deepSet(prev[section] ?? {}, path, value);
      return { ...prev, [section]: updated };
    });
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      // find sections with changes
      const changed = Object.keys(pendingContent).filter(
        (s) => JSON.stringify(pendingContent[s]) !== JSON.stringify(content[s])
      );
      await Promise.all(
        changed.map((section) =>
          fetch(`/api/content/${section}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-editor-password": password,
            },
            body: JSON.stringify(pendingContent[section]),
          })
        )
      );
      setContent((prev) => ({ ...prev, ...pendingContent }));
    } finally {
      setIsSaving(false);
    }
  }, [pendingContent, content, password]);

  const discard = useCallback(() => {
    setPendingContent(content);
  }, [content]);

  const exitEditor = useCallback(() => {
    sessionStorage.removeItem("chapter_editor_active");
    sessionStorage.removeItem("chapter_editor_password");
    setIsEditing(false);
    setPassword("");
    setContent({});
    setPendingContent({});
  }, []);

  const isDirty = Object.keys(pendingContent).some(
    (s) => JSON.stringify(pendingContent[s]) !== JSON.stringify(content[s])
  );

  return (
    <EditorContext.Provider
      value={{
        isEditing, password, activeSection, setActiveSection,
        content, pendingContent, updateField,
        save, discard, isSaving, isDirty, exitEditor, loadSection,
      }}
    >
      <Suspense>
        <EditorParamWatcher onActivate={activateEditor} />
      </Suspense>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used inside EditorProvider");
  return ctx;
}

// Utility: deep-set a value at a dot-notation path
function deepSet(obj: unknown, path: string, value: unknown): unknown {
  const keys = path.split(".");
  const clone: unknown = Array.isArray(obj) ? [...(obj as unknown[])] : { ...(obj as Record<string, unknown>) };
  let cur: Record<string, unknown> | unknown[] = clone as Record<string, unknown> | unknown[];
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const next = Array.isArray(cur) ? (cur as unknown[])[Number(k)] : (cur as Record<string, unknown>)[k];
    const clonedNext: unknown = Array.isArray(next) ? [...(next as unknown[])] : { ...(next as Record<string, unknown>) };
    if (Array.isArray(cur)) {
      (cur as unknown[])[Number(k)] = clonedNext;
      cur = clonedNext as unknown[];
    } else {
      (cur as Record<string, unknown>)[k] = clonedNext;
      cur = clonedNext as Record<string, unknown>;
    }
  }
  const lastKey = keys[keys.length - 1];
  if (Array.isArray(cur)) {
    (cur as unknown[])[Number(lastKey)] = value;
  } else {
    (cur as Record<string, unknown>)[lastKey] = value;
  }
  return clone;
}
