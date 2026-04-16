import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { SCDSB_URL, SMCDSB_URL } from "@/lib/constants";
import { mockSchools } from "@/lib/mock-data";
import type { SchoolStatus, SchoolsData, CachedData } from "@/types";

const BOARDS = [
  { url: SCDSB_URL, board: "Simcoe County District School Board", short: "SCDSB" },
  { url: SMCDSB_URL, board: "Simcoe Muskoka Catholic DSB", short: "SMCDSB" },
];

async function checkBoard(board: (typeof BOARDS)[number]): Promise<SchoolStatus> {
  try {
    const res = await fetch(board.url, {
      headers: { "User-Agent": "BarriePulse/1.0 (community dashboard)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Look for closure-related banners or alerts
    const alertEl = $("[class*='alert'], [class*='banner'], [class*='notice'], [class*='closure'], [class*='emergency']").first();
    const alertText = alertEl.text().trim();
    const pageText = $("body").text().toLowerCase();

    const hasClosure =
      (alertText.toLowerCase().includes("closed") || alertText.toLowerCase().includes("closure")) &&
      alertText.toLowerCase().includes("school");
    const pageHasClosure =
      pageText.includes("schools closed") || pageText.includes("school closure");

    if (hasClosure || pageHasClosure) {
      return {
        board: board.board,
        boardShort: board.short,
        status: "closed",
        message: alertText || "Schools closed — check board website",
      };
    }

    return {
      board: board.board,
      boardShort: board.short,
      status: "open",
      message: "All schools open",
    };
  } catch {
    return {
      board: board.board,
      boardShort: board.short,
      status: "open",
      message: "Unable to verify — check board website",
    };
  }
}

export async function GET() {
  try {
    const schools = await Promise.all(BOARDS.map(checkBoard));

    const data: CachedData<SchoolsData> = {
      data: { schools, busCancellations: [] },
      fetchedAt: new Date().toISOString(),
      source: "SCDSB / SMCDSB",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(mockSchools, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  }
}
