import { NextResponse } from "next/server";
import { mockGOTransit } from "@/lib/mock-data";

export async function GET() {
  // GO Transit GTFS-RT requires an API key from openmetrolinx.com
  // Set GO_TRANSIT_API_KEY env var to enable real data
  // Also requires `gtfs-realtime-bindings` package for protobuf parsing
  const apiKey = process.env.GO_TRANSIT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(mockGOTransit, {
      headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
    });
  }

  try {
    // TODO: Implement GTFS-RT protobuf parsing when API key is available
    // npm install gtfs-realtime-bindings
    // Endpoint: https://api.openmetrolinx.com/OpenDataAPI/api/V1/Gtfs.proto/Feed/TripUpdates?key=<KEY>
    // Filter by Barrie line route_id, stops: Allandale Waterfront (AL), Barrie South (BA)
    throw new Error("GTFS-RT protobuf parsing not yet implemented");
  } catch {
    return NextResponse.json(mockGOTransit, {
      headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
    });
  }
}
