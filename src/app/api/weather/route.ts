import { NextResponse } from "next/server";
import { mockWeather } from "@/lib/mock-data";

export async function GET() {
  // TODO: Replace with real Environment Canada fetcher
  // For now, return mock data
  return NextResponse.json(mockWeather, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
