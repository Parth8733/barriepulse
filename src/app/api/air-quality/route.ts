import { NextResponse } from "next/server";
import { OPEN_METEO_AQ_URL } from "@/lib/constants";
import { mockAirQuality } from "@/lib/mock-data";
import type { AirQualityData, CachedData } from "@/types";

function aqhiRisk(aqhi: number): AirQualityData["risk"] {
  if (aqhi <= 3) return "Low";
  if (aqhi <= 6) return "Moderate";
  if (aqhi <= 10) return "High";
  return "Very High";
}

/** Approximate mapping from US AQI to Canadian AQHI */
function usAqiToAqhi(aqi: number): number {
  if (aqi <= 50) return Math.max(1, Math.round(aqi / 17));
  if (aqi <= 100) return Math.round(3 + (aqi - 50) / 17);
  if (aqi <= 150) return 7;
  if (aqi <= 200) return Math.round(7 + (aqi - 150) / 17);
  return 10;
}

export async function GET() {
  try {
    const res = await fetch(OPEN_METEO_AQ_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const usAqi = json.current.us_aqi;
    if (typeof usAqi !== "number") throw new Error("Missing us_aqi");
    const aqhi = usAqiToAqhi(usAqi);

    const data: CachedData<AirQualityData> = {
      data: { aqhi, risk: aqhiRisk(aqhi) },
      fetchedAt: new Date().toISOString(),
      source: "Open-Meteo (estimated AQHI)",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(mockAirQuality, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
