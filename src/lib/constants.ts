// BarriePulse constants

// Barrie, ON coordinates
export const BARRIE_LAT = 44.3894;
export const BARRIE_LNG = -79.6903;

// Environment Canada station for Barrie
export const EC_STATION_ID = "s0000415";
export const EC_WEATHER_BASE = "https://dd.weather.gc.ca/today/citypage_weather/ON";

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

// Open-Meteo (free, no auth — weather, UV index & air quality)
export const OPEN_METEO_WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${BARRIE_LAT}&longitude=${BARRIE_LNG}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America/Toronto&forecast_days=7`;
export const OPEN_METEO_UV_URL = `https://api.open-meteo.com/v1/forecast?latitude=${BARRIE_LAT}&longitude=${BARRIE_LNG}&current=uv_index`;
export const OPEN_METEO_AQ_URL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${BARRIE_LAT}&longitude=${BARRIE_LNG}&current=us_aqi`;

// Ontario 511 road events
export const ONTARIO_511_URL = "https://511on.ca/api/v2/get/event";

// News RSS feeds
export const CBC_RSS_URL = "https://www.cbc.ca/webfeed/rss/rss-canada-toronto";
export const BARRIE_TODAY_RSS_URL = "https://www.barrietoday.com/rss";

// School boards
export const SCDSB_URL = "https://www.scdsb.on.ca";
export const SMCDSB_URL = "https://www.smcdsb.on.ca";

// Gas prices
export const ONTARIO_GAS_URL = "https://www.ontario.ca/page/motor-fuel-prices";

// Events
export const BARRIE_EVENTS_URL = "https://www.barrie.ca/community-recreation/events/community-events-calendar";

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
