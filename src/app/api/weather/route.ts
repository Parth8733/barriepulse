import { NextResponse } from "next/server";
import { OPEN_METEO_WEATHER_URL } from "@/lib/constants";
import { mockWeather } from "@/lib/mock-data";
import type { WeatherData, ForecastDay, CachedData } from "@/types";

// WMO weather code → human-readable condition & icon code
function wmoCondition(code: number): { condition: string; iconCode: string } {
  if (code === 0) return { condition: "Clear Sky", iconCode: "00" };
  if (code <= 3) return { condition: "Partly Cloudy", iconCode: "02" };
  if (code <= 48) return { condition: "Foggy", iconCode: "24" };
  if (code <= 55) return { condition: "Drizzle", iconCode: "12" };
  if (code <= 57) return { condition: "Freezing Drizzle", iconCode: "15" };
  if (code <= 65) return { condition: "Rain", iconCode: "12" };
  if (code <= 67) return { condition: "Freezing Rain", iconCode: "14" };
  if (code <= 75) return { condition: "Snow", iconCode: "16" };
  if (code <= 77) return { condition: "Snow Grains", iconCode: "17" };
  if (code <= 82) return { condition: "Rain Showers", iconCode: "12" };
  if (code <= 86) return { condition: "Snow Showers", iconCode: "16" };
  if (code === 95) return { condition: "Thunderstorm", iconCode: "06" };
  if (code <= 99) return { condition: "Thunderstorm with Hail", iconCode: "06" };
  return { condition: "Unknown", iconCode: "00" };
}

function degToCompass(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export async function GET() {
  try {
    const res = await fetch(OPEN_METEO_WEATHER_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const c = json.current;
    const d = json.daily;
    const temperature = Math.round(c.temperature_2m);
    const feelsLike = Math.round(c.apparent_temperature);
    const humidity = Math.round(c.relative_humidity_2m);
    const windSpeed = Math.round(c.wind_speed_10m);
    const windDirection = degToCompass(c.wind_direction_10m);
    const { condition, iconCode } = wmoCondition(c.weather_code);

    const highTemp = Math.round(d.temperature_2m_max[0]);
    const lowTemp = Math.round(d.temperature_2m_min[0]);
    const tomorrowHigh = Math.round(d.temperature_2m_max[1]);
    const tomorrowLow = Math.round(d.temperature_2m_min[1]);
    const tomorrowCondition = wmoCondition(d.weather_code[1]).condition;

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const forecast: ForecastDay[] = d.time.map((date: string, i: number) => {
      const dt = new Date(date + "T12:00:00");
      const { condition: fc, iconCode: fic } = wmoCondition(d.weather_code[i]);
      return {
        date,
        dayName: i === 0 ? "Today" : dayNames[dt.getDay()],
        high: Math.round(d.temperature_2m_max[i]),
        low: Math.round(d.temperature_2m_min[i]),
        condition: fc,
        iconCode: fic,
      };
    });

    const data: CachedData<WeatherData> = {
      data: {
        temperature, feelsLike, humidity, windSpeed, windDirection,
        condition, iconCode, highTemp, lowTemp,
        tomorrowCondition, tomorrowHigh, tomorrowLow,
        forecast,
      },
      fetchedAt: new Date().toISOString(),
      source: "Open-Meteo",
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(mockWeather, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
