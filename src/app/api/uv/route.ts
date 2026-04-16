import { NextResponse } from "next/server";
import { mockUVIndex } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockUVIndex, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
