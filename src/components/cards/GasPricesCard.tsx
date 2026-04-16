"use client";

import { Fuel, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { GasPriceData, CachedData, CardId } from "@/types";

interface GasPricesCardProps {
  data: CachedData<GasPriceData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

function TrendIcon({ trend }: { trend: string }) {
  switch (trend) {
    case "up": return <TrendingUp className="w-4 h-4 text-danger" />;
    case "down": return <TrendingDown className="w-4 h-4 text-success" />;
    default: return <Minus className="w-4 h-4 text-muted" />;
  }
}

export function GasPricesCard({ data, isLoading, error, isPinned, onTogglePin }: GasPricesCardProps) {
  return (
    <Card
      cardId="gas-prices"
      title="Gas Prices"
      icon={Fuel}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
    >
      {data && (
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${data.data.price.toFixed(3)}</span>
            <span className="text-sm text-muted">/L</span>
            <TrendIcon trend={data.data.trend} />
          </div>
          <p className="text-xs text-muted mt-1">Cheapest regular · {data.data.station}</p>
        </div>
      )}
    </Card>
  );
}
