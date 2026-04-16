"use client";

import { Cloud, CloudRain, Sun, CloudSnow, CloudFog, CloudLightning } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { WeatherData, CachedData, CardId } from "@/types";

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("shower")) return CloudRain;
  if (c.includes("snow") || c.includes("flurr")) return CloudSnow;
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return CloudFog;
  if (c.includes("thunder") || c.includes("storm")) return CloudLightning;
  if (c.includes("clear") || c.includes("sunny")) return Sun;
  return Cloud;
}

interface WeatherCardProps {
  data: CachedData<WeatherData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

export function WeatherCard({ data, isLoading, error, isPinned, onTogglePin }: WeatherCardProps) {
  const Icon = data ? getWeatherIcon(data.data.condition) : Cloud;

  return (
    <Card
      cardId="weather"
      title="Weather"
      icon={Icon}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
      footerLink={{ label: "7-day forecast", href: "https://weather.gc.ca/city/pages/on-151_metric_e.html" }}
    >
      {data && (
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{data.data.temperature}°C</span>
            <span className="text-sm text-muted">
              {data.data.temperature > (data.data.highTemp + data.data.lowTemp) / 2 ? "↑" : "↓"}
            </span>
          </div>
          <p className="text-sm text-muted mt-1">
            Feels {data.data.feelsLike}°
          </p>
          <p className="text-sm mt-2">
            {data.data.humidity}% humidity · {data.data.windSpeed} km/h {data.data.windDirection}
          </p>
          <p className="text-sm text-muted">{data.data.condition}</p>
          <div className="mt-3 pt-3 border-t border-border text-sm">
            <p>High {data.data.highTemp}° · Low {data.data.lowTemp}°</p>
            <p className="text-muted">
              {data.data.tomorrowCondition} tomorrow · {data.data.tomorrowHigh}°/{data.data.tomorrowLow}°
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
