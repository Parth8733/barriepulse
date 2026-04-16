import { NextResponse } from "next/server";
import { mockCollection } from "@/lib/mock-data";

export async function GET() {
  // TODO: Replace with City of Barrie ArcGIS Open Data REST API
  // Endpoint: https://opendata.barrie.ca — Curbside Collection Feature Service
  // Requires discovering the exact ArcGIS service URL and querying by zone/address
  return NextResponse.json(mockCollection, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}
