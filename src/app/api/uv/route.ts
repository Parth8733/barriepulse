import { NextResponse } from "next/server";
import { OPEN_METEO_UV_URL } from "@/lib/constants";
import { mockUVIndex } from "@/lib/mock-data";
import type { UVIndexData, CachedData } from "@/types";

function uvCategory(uv: number): UVIndexData["category"] {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

export async function GET() {
  try {
    const res = await fetch(OPEN_METEO_UV_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const uvIndex = Math.round(json.current.uv_index);

    const data: CachedData<UVIndexData> = {
      data: { uvIndex, category: uvCategory(uvIndex) },
      fetchedAt: new Date().toISOString(),
      source: "Open-Meteo",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(mockUVIndex, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
