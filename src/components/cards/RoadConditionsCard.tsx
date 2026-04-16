"use client";

import { Construction } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getRoadSeverityColor, classNames } from "@/lib/utils";
import type { RoadConditionsData, CachedData, CardId } from "@/types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface RoadConditionsCardProps {
  data: CachedData<RoadConditionsData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

function severityBadge(severity: string) {
  switch (severity) {
    case "major": return <Badge variant="danger">Major</Badge>;
    case "moderate": return <Badge variant="warning">Moderate</Badge>;
    case "minor": return <Badge variant="success">Minor</Badge>;
    default: return null;
  }
}

export function RoadConditionsCard({ data, isLoading, error, isPinned, onTogglePin }: RoadConditionsCardProps) {
  const [expanded, setExpanded] = useState(false);
  const events = data?.data.events ?? [];
  const visible = expanded ? events : events.slice(0, 3);
  const hasMore = events.length > 3;

  return (
    <Card
      cardId="road-conditions"
      title="Road Conditions"
      icon={Construction}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
      footerLink={{ label: "Ontario 511", href: "https://511on.ca" }}
    >
      {data && (
        <div>
          {events.length === 0 ? (
            <p className="text-sm text-success">No active incidents</p>
          ) : (
            <>
              <div className="space-y-3">
                {visible.map((evt) => (
                  <div key={evt.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={classNames("font-semibold", getRoadSeverityColor(evt.severity))}>
                        {evt.highway}
                      </span>
                      {severityBadge(evt.severity)}
                    </div>
                    <p className="text-muted text-xs">{evt.description}</p>
                    <p className="text-muted text-xs">Delay: {evt.expectedDelay}</p>
                  </div>
                ))}
              </div>
              {hasMore && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 mt-3 text-xs text-primary hover:text-primary-dim transition-colors"
                >
                  {expanded ? (
                    <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
                  ) : (
                    <>Show {events.length - 3} more <ChevronDown className="w-3.5 h-3.5" /></>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
}
