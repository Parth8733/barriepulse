// BarriePulse shared type definitions

export interface CachedData<T> {
  data: T;
  fetchedAt: string;
  source: string;
}

// Weather types
export interface ForecastDay {
  date: string;
  dayName: string;
  high: number;
  low: number;
  condition: string;
  iconCode: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  iconCode: string;
  highTemp: number;
  lowTemp: number;
  tomorrowCondition: string;
  tomorrowHigh: number;
  tomorrowLow: number;
  forecast?: ForecastDay[];
}

export interface AirQualityData {
  aqhi: number;
  risk: "Low" | "Moderate" | "High" | "Very High";
}

export interface UVIndexData {
  uvIndex: number;
  category: "Low" | "Moderate" | "High" | "Very High" | "Extreme";
}

export interface DaylightData {
  sunrise: string;
  sunset: string;
}

// Transit types
export interface GOTrainDeparture {
  scheduledTime: string;
  estimatedTime: string | null;
  delayMinutes: number;
  status: "on-time" | "delayed" | "cancelled";
  destination: string;
  station: string;
}

export interface GOTransitData {
  departures: GOTrainDeparture[];
  alerts: string[];
}

// Road conditions
export interface RoadEvent {
  id: string;
  type: "construction" | "closure" | "incident" | "special-event";
  severity: "minor" | "moderate" | "major";
  highway: string;
  description: string;
  direction: string;
  expectedDelay: string;
}

export interface RoadConditionsData {
  events: RoadEvent[];
}

// ER Wait Times
export interface ERWaitData {
  hospitalName: string;
  waitTime: string;
  waitMinutes: number | null;
}

// News
export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface NewsData {
  items: NewsItem[];
}

// Schools
export interface SchoolStatus {
  board: string;
  boardShort: string;
  status: "open" | "closed" | "delayed";
  message: string;
}

export interface SchoolsData {
  schools: SchoolStatus[];
  busCancellations: string[];
}

// Curbside Collection
export interface CollectionData {
  thisWeek: {
    type: string;
    color: string;
    items: string;
  };
  nextWeek: {
    type: string;
    color: string;
  };
  nextCollectionDate: string;
}

// Events
export interface EventItem {
  title: string;
  date: string;
  venue: string;
  link: string;
}

export interface EventsData {
  events: EventItem[];
}

// Gas prices
export interface GasPriceData {
  price: number;
  trend: "up" | "down" | "stable";
  station: string;
  updatedAt: string;
}

// Sections
export type SectionId =
  | "right-now"
  | "getting-around"
  | "around-town"
  | "essentials"
  | "news"
  | "city-info"
  | "live-feeds";

export type CardId =
  | "weather"
  | "air-quality"
  | "uv-index"
  | "daylight"
  | "lake"
  | "fire-ban"
  | "go-train"
  | "barrie-transit"
  | "road-conditions"
  | "parking"
  | "events"
  | "skating"
  | "swimming"
  | "farmers-market"
  | "colts"
  | "gas-prices"
  | "collection"
  | "schools"
  | "flyers"
  | "snow-plow"
  | "news-cbc"
  | "news-city"
  | "news-barrietoday"
  | "er-wait"
  | "walk-in-clinics"
  | "water-advisory"
  | "downtown"
  | "beach"
  | "webcams";
