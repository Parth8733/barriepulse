// Mock data for development
import type {
  WeatherData,
  AirQualityData,
  UVIndexData,
  DaylightData,
  GOTransitData,
  RoadConditionsData,
  ERWaitData,
  NewsData,
  SchoolsData,
  CollectionData,
  EventsData,
  GasPriceData,
  CachedData,
} from "@/types";

function cached<T>(data: T, source: string): CachedData<T> {
  return { data, fetchedAt: new Date().toISOString(), source };
}

export const mockWeather = cached<WeatherData>(
  {
    temperature: 8,
    feelsLike: 6,
    humidity: 72,
    windSpeed: 12,
    windDirection: "NW",
    condition: "Partly Cloudy",
    iconCode: "02",
    highTemp: 12,
    lowTemp: 3,
    tomorrowCondition: "Rain",
    tomorrowHigh: 10,
    tomorrowLow: 5,
  },
  "Environment Canada"
);

export const mockAirQuality = cached<AirQualityData>(
  { aqhi: 2, risk: "Low" },
  "Environment Canada"
);

export const mockUVIndex = cached<UVIndexData>(
  { uvIndex: 3, category: "Moderate" },
  "Environment Canada"
);

export const mockDaylight = cached<DaylightData>(
  { sunrise: "6:32 AM", sunset: "7:58 PM" },
  "Sunrise-Sunset API"
);

export const mockGOTransit = cached<GOTransitData>(
  {
    departures: [
      {
        scheduledTime: "6:45 AM",
        estimatedTime: null,
        delayMinutes: 0,
        status: "on-time",
        destination: "Union Station",
        station: "Allandale Waterfront",
      },
      {
        scheduledTime: "7:30 AM",
        estimatedTime: "7:33 AM",
        delayMinutes: 3,
        status: "delayed",
        destination: "Union Station",
        station: "Allandale Waterfront",
      },
      {
        scheduledTime: "8:15 AM",
        estimatedTime: null,
        delayMinutes: 0,
        status: "on-time",
        destination: "Union Station",
        station: "Allandale Waterfront",
      },
    ],
    alerts: ["Signal upgrades between Aurora and Newmarket — expect minor delays until April 30."],
  },
  "Metrolinx GO Transit"
);

export const mockRoads = cached<RoadConditionsData>(
  {
    events: [
      {
        id: "1",
        type: "closure",
        severity: "major",
        highway: "Hwy 400 SB",
        description: "Collision cleanup — 2 lanes closed near Dunlop St exit",
        direction: "Southbound",
        expectedDelay: "30-45 min",
      },
      {
        id: "2",
        type: "construction",
        severity: "moderate",
        highway: "Hwy 26",
        description: "Road resurfacing near Essa Rd interchange",
        direction: "Both Directions",
        expectedDelay: "15-30 min",
      },
      {
        id: "3",
        type: "construction",
        severity: "minor",
        highway: "Bayfield St",
        description: "Water main replacement — single lane alternating",
        direction: "Both Directions",
        expectedDelay: "Under 15 min",
      },
    ],
  },
  "Ontario 511"
);

export const mockER = cached<ERWaitData>(
  {
    hospitalName: "Royal Victoria Regional Health Centre",
    waitTime: "2h 15m",
    waitMinutes: 135,
  },
  "RVH"
);

export const mockNews = cached<NewsData>(
  {
    items: [
      {
        title: "Barrie approves $12M waterfront revitalization plan",
        link: "https://www.cbc.ca/barrie-waterfront",
        pubDate: new Date(Date.now() - 2 * 3600000).toISOString(),
        source: "CBC",
      },
      {
        title: "GO Train service expanding with weekend frequency boost",
        link: "https://www.cbc.ca/go-train-barrie",
        pubDate: new Date(Date.now() - 5 * 3600000).toISOString(),
        source: "CBC",
      },
      {
        title: "New splash pad opening at Sunnidale Park this summer",
        link: "https://www.barrie.ca/splash-pad",
        pubDate: new Date(Date.now() - 8 * 3600000).toISOString(),
        source: "City of Barrie",
      },
      {
        title: "RVH opens new advanced lung testing centre",
        link: "https://www.rvh.on.ca/lung-testing",
        pubDate: new Date(Date.now() - 12 * 3600000).toISOString(),
        source: "City of Barrie",
      },
      {
        title: "Barrie Colts advance to OHL Eastern Conference semifinals",
        link: "https://www.barrietoday.com/colts-advance",
        pubDate: new Date(Date.now() - 18 * 3600000).toISOString(),
        source: "BarrieToday",
      },
    ],
  },
  "CBC / City of Barrie / BarrieToday"
);

export const mockSchools = cached<SchoolsData>(
  {
    schools: [
      { board: "Simcoe County District School Board", boardShort: "SCDSB", status: "open", message: "All schools open" },
      { board: "Simcoe Muskoka Catholic DSB", boardShort: "SMCDSB", status: "open", message: "All schools open" },
    ],
    busCancellations: [],
  },
  "SCDSB / SMCDSB"
);

export const mockCollection = cached<CollectionData>(
  {
    thisWeek: {
      type: "Blue Bin",
      color: "blue",
      items: "Cans, plastics, cartons, glass bottles & jars",
    },
    nextWeek: {
      type: "Green Bin",
      color: "green",
    },
    nextCollectionDate: "Thursday, April 17",
  },
  "City of Barrie"
);

export const mockEvents = cached<EventsData>(
  {
    events: [
      { title: "Barrie Farmers' Market — Opening Day", date: "Sat, April 19", venue: "Barrie City Hall", link: "#" },
      { title: "Earth Day Cleanup — Kempenfelt Bay", date: "Tue, April 22", venue: "Centennial Park", link: "#" },
      { title: "Barrie Colts vs Kingston Frontenacs", date: "Fri, April 25", venue: "Sadlon Arena", link: "#" },
      { title: "Spring Garden Workshop", date: "Sat, April 26", venue: "Holly Community Centre", link: "#" },
      { title: "Downtown Barrie Art Walk", date: "Sun, April 27", venue: "Dunlop St E", link: "#" },
    ],
  },
  "City of Barrie"
);

export const mockGasPrices = cached<GasPriceData>(
  {
    price: 1.589,
    trend: "down",
    station: "Costco — Park Place",
    updatedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  "GasBuddy"
);
