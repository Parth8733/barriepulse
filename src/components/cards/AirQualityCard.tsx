"use client";

import { Leaf } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getAQHIRisk, classNames } from "@/lib/utils";
import type { AirQualityData, CachedData, CardId } from "@/types";

interface AirQualityCardProps {
  data: CachedData<AirQualityData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

export function AirQualityCard({ data, isLoading, error, isPinned, onTogglePin }: AirQualityCardProps) {
  const info = data ? getAQHIRisk(data.data.aqhi) : null;

  return (
    <Card
      cardId="air-quality"
      title="Air Quality"
      icon={Leaf}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
    >
      {data && info && (
        <div>
          <div className="flex items-baseline gap-3">
            <span className={classNames("text-4xl font-bold", info.color)}>
              {data.data.aqhi}
            </span>
            <Badge variant={data.data.aqhi <= 3 ? "success" : data.data.aqhi <= 6 ? "warning" : "danger"}>
              {info.risk}
            </Badge>
          </div>
          <p className="text-xs text-muted mt-2">
            Air Quality Health Index (AQHI) · Scale 1–10+
          </p>
        </div>
      )}
    </Card>
  );
}
