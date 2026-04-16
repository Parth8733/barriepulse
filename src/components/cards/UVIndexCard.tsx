"use client";

import { SunMedium } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getUVCategory, classNames } from "@/lib/utils";
import type { UVIndexData, CachedData, CardId } from "@/types";

interface UVIndexCardProps {
  data: CachedData<UVIndexData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

export function UVIndexCard({ data, isLoading, error, isPinned, onTogglePin }: UVIndexCardProps) {
  const info = data ? getUVCategory(data.data.uvIndex) : null;

  return (
    <Card
      cardId="uv-index"
      title="UV Index"
      icon={SunMedium}
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
              {data.data.uvIndex}
            </span>
            <Badge variant={data.data.uvIndex <= 2 ? "success" : data.data.uvIndex <= 5 ? "warning" : "danger"}>
              {info.category}
            </Badge>
          </div>
        </div>
      )}
    </Card>
  );
}
