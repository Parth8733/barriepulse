"use client";

import { Train } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";
import type { GOTransitData, CachedData, CardId } from "@/types";

interface GOTrainCardProps {
  data: CachedData<GOTransitData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

function statusBadge(status: string) {
  switch (status) {
    case "on-time":
      return <Badge variant="success">On Time</Badge>;
    case "delayed":
      return <Badge variant="warning">Delayed</Badge>;
    case "cancelled":
      return <Badge variant="danger">Cancelled</Badge>;
    default:
      return null;
  }
}

export function GOTrainCard({ data, isLoading, error, isPinned, onTogglePin }: GOTrainCardProps) {
  return (
    <Card
      cardId="go-train"
      title="GO Train"
      icon={Train}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
      footerLink={{ label: "Full schedule", href: "https://www.gotransit.com/en/trip-planning/barrie-line" }}
    >
      {data && (
        <div>
          <p className="text-xs text-muted mb-3">Allandale Waterfront → Union</p>
          <div className="space-y-2">
            {data.data.departures.map((dep, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{dep.scheduledTime}</span>
                  {dep.delayMinutes > 0 && (
                    <span className="text-warning text-xs">+{dep.delayMinutes} min</span>
                  )}
                </div>
                {statusBadge(dep.status)}
              </div>
            ))}
          </div>
          {data.data.alerts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              {data.data.alerts.map((alert, i) => (
                <div key={i} className="flex gap-2 text-xs text-warning">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
