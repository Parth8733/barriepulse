import { NextResponse } from "next/server";
import { mockNews } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockNews, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
