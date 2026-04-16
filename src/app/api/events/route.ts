import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { BARRIE_EVENTS_URL } from "@/lib/constants";
import { mockEvents } from "@/lib/mock-data";
import type { EventItem, EventsData, CachedData } from "@/types";

export async function GET() {
  try {
    const res = await fetch(BARRIE_EVENTS_URL, {
      headers: { "User-Agent": "BarriePulse/1.0 (community dashboard)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const events: EventItem[] = [];
    $("[class*='event'], .views-row, article, .event-item, .list-item").each((_, el) => {
      const title = $(el).find("h2, h3, h4, .title, [class*='title']").first().text().trim();
      const date = $(el).find("[class*='date'], time, .field-date").first().text().trim();
      const venue = $(el).find("[class*='location'], [class*='venue']").first().text().trim();
      const rawLink = $(el).find("a").first().attr("href") || "";
      const link = rawLink.startsWith("http") ? rawLink : `https://www.barrie.ca${rawLink}`;

      if (title) {
        events.push({ title, date: date || "TBD", venue: venue || "Barrie", link });
      }
    });

    if (events.length === 0) throw new Error("No events found");

    const data: CachedData<EventsData> = {
      data: { events: events.slice(0, 10) },
      fetchedAt: new Date().toISOString(),
      source: "City of Barrie",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(mockEvents, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  }
}
