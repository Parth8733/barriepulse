import { NextResponse } from "next/server";
import { mockER } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockER, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
  });
}
