import { NextResponse } from "next/server";
import { mockAirQuality } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockAirQuality, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
