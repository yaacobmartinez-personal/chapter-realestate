import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const valid = !!process.env.EDITOR_PASSWORD && password === process.env.EDITOR_PASSWORD;
  return NextResponse.json({ valid });
}
