import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

// Note: file-system writes work in dev and on Node.js servers. For Vercel production, replace fs writes with a database (Supabase, PlanetScale, etc.)

const pathMap: Record<string, string> = {
  home: "/",
  about: "/about",
  brokerage: "/brokerage",
  "property-management": "/property-management",
  investments: "/investments",
  recruitment: "/recruitment",
  resources: "/resources",
  contact: "/contact",
};

const ALLOWED_SECTIONS = new Set(Object.keys(pathMap));

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!ALLOWED_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "lib", "content", `${section}.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!ALLOWED_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const editorPassword = req.headers.get("x-editor-password");
  if (!process.env.EDITOR_PASSWORD || editorPassword !== process.env.EDITOR_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "lib", "content", `${section}.json`);
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");

    const pagePath = pathMap[section];
    if (pagePath) {
      revalidatePath(pagePath);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to write content" }, { status: 500 });
  }
}
