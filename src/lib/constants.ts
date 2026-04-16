// BarriePulse constants

// Barrie, ON coordinates
export const BARRIE_LAT = 44.3894;
export const BARRIE_LNG = -79.6903;

// Environment Canada station for Barrie-Oro
export const EC_STATION_ID = "s0000092";
export const EC_WEATHER_URL = `https://dd.weather.gc.ca/citypage_weather/xml/ON/${EC_STATION_ID}_e.xml`;

// Ontario 511 — Barrie area bounding box
export const BARRIE_BBOX = {
  minLat: 44.3,
  maxLat: 44.5,
  minLng: -79.85,
  maxLng: -79.55,
};

// RVH ER wait times
export const RVH_ER_URL = "https://bi.rvh.on.ca:444/SEQ_PublicFacing/";

// Sunrise/sunset API
export const SUNRISE_API_URL = `https://api.sunrise-sunset.org/json?lat=${BARRIE_LAT}&lng=${BARRIE_LNG}&formatted=0`;

// Poll intervals (in ms) for client-side SWR
export const POLL_INTERVALS = {
  weather: 60_000,        // 1 min
  airQuality: 300_000,    // 5 min
  uvIndex: 300_000,       // 5 min
  daylight: 3_600_000,    // 1 hour
  goTrain: 30_000,        // 30 sec
  barrieTransit: 60_000,  // 1 min
  roads: 120_000,         // 2 min
  erWait: 60_000,         // 1 min
  news: 300_000,          // 5 min
  schools: 120_000,       // 2 min
  events: 1_800_000,      // 30 min
  gasPrices: 1_800_000,   // 30 min
  collection: 86_400_000, // 24 hours
} as const;

// Cache TTLs (in seconds) for server-side KV
export const CACHE_TTLS = {
  weather: 1200,       // 20 min
  airQuality: 5400,    // 90 min
  roads: 600,          // 10 min
  erWait: 600,         // 10 min
  news: 2700,          // 45 min
  schools: 1200,       // 20 min
  events: 25200,       // 7 hours
  gasPrices: 25200,    // 7 hours
  collection: 691200,  // 8 days
  goTrain: 180,        // 3 min
} as const;

// Section definitions for navigation
export const SECTIONS = [
  { id: "right-now", label: "Right Now", icon: "Sun" },
  { id: "getting-around", label: "Getting Around", icon: "Train" },
  { id: "around-town", label: "Around Town", icon: "Calendar" },
  { id: "essentials", label: "Essentials", icon: "ClipboardList" },
  { id: "news", label: "News", icon: "Newspaper" },
  { id: "city-info", label: "City Info", icon: "Building2" },
  { id: "live-feeds", label: "Live Feeds", icon: "Camera" },
] as const;
