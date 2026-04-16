import { NextResponse } from "next/server";
import { mockGasPrices } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockGasPrices, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
  });
}
