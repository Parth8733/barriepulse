import { NextResponse } from "next/server";
import { ONTARIO_511_URL, BARRIE_BBOX } from "@/lib/constants";
import { mockRoads } from "@/lib/mock-data";
import type { RoadEvent, RoadConditionsData, CachedData } from "@/types";

function mapEventType(type: string): RoadEvent["type"] {
  const t = type.toLowerCase();
  if (t.includes("construction") || t.includes("planned")) return "construction";
  if (t.includes("closure") || t.includes("closed")) return "closure";
  if (t.includes("special") || t.includes("event")) return "special-event";
  return "incident";
}

function mapSeverity(severity: string): RoadEvent["severity"] {
  const s = severity.toLowerCase();
  if (s.includes("major") || s.includes("high") || s.includes("3")) return "major";
  if (s.includes("moderate") || s.includes("medium") || s.includes("2")) return "moderate";
  return "minor";
}

export async function GET() {
  try {
    const res = await fetch(`${ONTARIO_511_URL}?format=json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // Handle both array and wrapped object responses
    const raw: unknown[] = Array.isArray(json) ? json : (json.Events ?? json.events ?? []);

    const events: RoadEvent[] = raw
      .filter((e: any) => {
        const lat = e.Latitude ?? e.latitude ?? e.Geography?.Coordinates?.Latitude;
        const lng = e.Longitude ?? e.longitude ?? e.Geography?.Coordinates?.Longitude;
        if (typeof lat !== "number" || typeof lng !== "number") return false;
        return lat >= BARRIE_BBOX.minLat && lat <= BARRIE_BBOX.maxLat &&
               lng >= BARRIE_BBOX.minLng && lng <= BARRIE_BBOX.maxLng;
      })
      .slice(0, 10)
      .map((e: any, i: number) => ({
        id: String(e.ID ?? e.id ?? i),
        type: mapEventType(e.EventType ?? e.eventType ?? e.Type ?? ""),
        severity: mapSeverity(e.Severity ?? e.severity ?? ""),
        highway: e.RoadwayName ?? e.roadwayName ?? e.Road ?? "Unknown",
        description: e.Description ?? e.description ?? "",
        direction: e.DirectionOfTravel ?? e.Direction ?? e.direction ?? "",
        expectedDelay: e.PlannedEndDate ? "See details" : "Unknown",
      }));

    const data: CachedData<RoadConditionsData> = {
      data: { events },
      fetchedAt: new Date().toISOString(),
      source: "Ontario 511",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(mockRoads, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
