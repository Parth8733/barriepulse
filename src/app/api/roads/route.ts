import { NextResponse } from "next/server";
import { mockRoads } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockRoads, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
