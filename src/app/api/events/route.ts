import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockEvents, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
  });
}
