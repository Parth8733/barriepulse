import { NextResponse } from "next/server";
import { mockGOTransit } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockGOTransit, {
    headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
  });
}
