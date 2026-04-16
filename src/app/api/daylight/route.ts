import { NextResponse } from "next/server";
import { mockDaylight } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockDaylight, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}
