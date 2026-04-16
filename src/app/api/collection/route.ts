import { NextResponse } from "next/server";
import { mockCollection } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockCollection, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}
