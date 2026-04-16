import { NextResponse } from "next/server";
import { mockSchools } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockSchools, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
  });
}
