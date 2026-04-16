import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { CBC_RSS_URL, BARRIE_TODAY_RSS_URL } from "@/lib/constants";
import { mockNews } from "@/lib/mock-data";
import type { NewsItem, NewsData, CachedData } from "@/types";

const FEEDS = [
  { url: CBC_RSS_URL, source: "CBC", filterBarrie: true },
  { url: BARRIE_TODAY_RSS_URL, source: "BarrieToday", filterBarrie: false },
];

async function parseRSS(feedUrl: string, source: string, filterBarrie: boolean): Promise<NewsItem[]> {
  const res = await fetch(feedUrl, {
    headers: { "User-Agent": "BarriePulse/1.0 (community dashboard)" },
  });
  if (!res.ok) return [];
  const xml = await res.text();
  const $ = cheerio.load(xml, { xml: true });

  const items: NewsItem[] = [];
  $("item").each((_, el) => {
    const title = $(el).find("title").text();
    const link = $(el).find("link").text() || $(el).find("link").attr("href") || "";
    const pubDate = $(el).find("pubDate").text();
    const description = $(el).find("description").text();

    if (filterBarrie) {
      const text = `${title} ${description}`.toLowerCase();
      if (!text.includes("barrie") && !text.includes("simcoe")) return;
    }

    items.push({
      title,
      link,
      pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      source,
    });
  });

  return items;
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      FEEDS.map((f) => parseRSS(f.url, f.source, f.filterBarrie))
    );

    const allItems: NewsItem[] = results
      .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
      .flatMap((r) => r.value);

    if (allItems.length === 0) throw new Error("No news items fetched");

    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    const data: CachedData<NewsData> = {
      data: { items: allItems.slice(0, 15) },
      fetchedAt: new Date().toISOString(),
      source: "CBC / BarrieToday",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(mockNews, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
