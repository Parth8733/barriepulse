import { NextResponse } from "next/server";
import { SUNRISE_API_URL } from "@/lib/constants";
import { mockDaylight } from "@/lib/mock-data";
import type { DaylightData, CachedData } from "@/types";

export async function GET() {
  try {
    const res = await fetch(SUNRISE_API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== "OK") throw new Error("API returned non-OK status");

    const fmt = (iso: string) =>
      new Date(iso).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Toronto",
      });

    const data: CachedData<DaylightData> = {
      data: { sunrise: fmt(json.results.sunrise), sunset: fmt(json.results.sunset) },
      fetchedAt: new Date().toISOString(),
      source: "Sunrise-Sunset API",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json(mockDaylight, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    });
  }
}
