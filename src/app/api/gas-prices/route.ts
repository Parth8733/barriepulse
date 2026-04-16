import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { ONTARIO_GAS_URL } from "@/lib/constants";
import { mockGasPrices } from "@/lib/mock-data";
import type { GasPriceData, CachedData } from "@/types";

export async function GET() {
  try {
    const res = await fetch(ONTARIO_GAS_URL, {
      headers: { "User-Agent": "BarriePulse/1.0 (community dashboard)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Look for Barrie price in tables or list elements
    let price: number | null = null;
    $("table tr, li, dd").each((_, el) => {
      const text = $(el).text();
      if (text.toLowerCase().includes("barrie")) {
        const priceMatch = text.match(/(\d+\.\d+)/);
        if (priceMatch) {
          price = parseFloat(priceMatch[1]);
        }
      }
    });

    if (!price) throw new Error("Could not find Barrie gas price");

    const data: CachedData<GasPriceData> = {
      data: {
        price,
        trend: "stable",
        station: "Barrie average",
        updatedAt: new Date().toISOString(),
      },
      fetchedAt: new Date().toISOString(),
      source: "Ontario.ca",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(mockGasPrices, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  }
}
