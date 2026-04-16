"use client";

import { useState } from "react";
import { Cloud, CloudRain, Sun, CloudSnow, CloudFog, CloudLightning, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { WeatherData, CachedData, CardId } from "@/types";

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("shower") || c.includes("drizzle")) return CloudRain;
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
  const [showForecast, setShowForecast] = useState(false);
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

          {/* 7-day forecast toggle */}
          {data.data.forecast && data.data.forecast.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowForecast(!showForecast)}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary-dim transition-colors cursor-pointer"
              >
                7-day forecast
                {showForecast ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showForecast && (
                <div className="mt-2 space-y-1.5">
                  {data.data.forecast.map((day) => {
                    const DayIcon = getWeatherIcon(day.condition);
                    return (
                      <div key={day.date} className="flex items-center justify-between text-sm">
                        <span className="w-12 font-medium">{day.dayName}</span>
                        <DayIcon className="w-4 h-4 text-muted shrink-0" />
                        <span className="flex-1 text-xs text-muted text-center truncate px-1">{day.condition}</span>
                        <span className="text-right whitespace-nowrap">
                          <span className="font-medium">{day.high}°</span>
                          <span className="text-muted"> / {day.low}°</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
