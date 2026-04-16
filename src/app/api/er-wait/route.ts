import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { RVH_ER_URL } from "@/lib/constants";
import { mockER } from "@/lib/mock-data";
import type { ERWaitData, CachedData } from "@/types";

export async function GET() {
  try {
    const res = await fetch(RVH_ER_URL, {
      headers: { "User-Agent": "BarriePulse/1.0 (community dashboard)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Try to extract wait time from the public-facing page
    const bodyText = $("body").text();
    const waitMatch =
      bodyText.match(/(\d+)\s*(?:hours?|hrs?)\s*(?:and\s*)?(\d+)?\s*(?:minutes?|mins?)?/i) ||
      bodyText.match(/(\d+)\s*(?:minutes?|mins?)/i);

    if (!waitMatch) throw new Error("Could not parse wait time");

    let waitMinutes: number;
    let waitTime: string;

    if (waitMatch[0].toLowerCase().includes("hour")) {
      const hours = parseInt(waitMatch[1]) || 0;
      const minutes = parseInt(waitMatch[2]) || 0;
      waitMinutes = hours * 60 + minutes;
      waitTime = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else {
      waitMinutes = parseInt(waitMatch[1]) || 0;
      waitTime =
        waitMinutes >= 60
          ? `${Math.floor(waitMinutes / 60)}h ${waitMinutes % 60}m`
          : `${waitMinutes}m`;
    }

    const data: CachedData<ERWaitData> = {
      data: {
        hospitalName: "Royal Victoria Regional Health Centre",
        waitTime,
        waitMinutes,
      },
      fetchedAt: new Date().toISOString(),
      source: "RVH",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
    });
  } catch {
    return NextResponse.json(mockER, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
    });
  }
}
