"use client";

import { Sunrise } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { DaylightData, CachedData, CardId } from "@/types";

interface DaylightCardProps {
  data: CachedData<DaylightData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

export function DaylightCard({ data, isLoading, error, isPinned, onTogglePin }: DaylightCardProps) {
  return (
    <Card
      cardId="daylight"
      title="Daylight"
      icon={Sunrise}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
    >
      {data && (
        <div className="flex gap-6">
          <div>
            <p className="text-xs text-muted uppercase tracking-wide">Sunrise</p>
            <p className="text-lg font-semibold">{data.data.sunrise}</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wide">Sunset</p>
            <p className="text-lg font-semibold">{data.data.sunset}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
