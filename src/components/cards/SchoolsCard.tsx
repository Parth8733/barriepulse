"use client";

import { GraduationCap, Bus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { SchoolsData, CachedData, CardId } from "@/types";

interface SchoolsCardProps {
  data: CachedData<SchoolsData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

function isSchoolHours(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  return day >= 1 && day <= 5 && hour >= 6 && hour < 16;
}

export function SchoolsCard({ data, isLoading, error, isPinned, onTogglePin }: SchoolsCardProps) {
  const showActive = isSchoolHours();

  return (
    <Card
      cardId="schools"
      title="Schools"
      icon={GraduationCap}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
    >
      {data && (
        <div>
          {!showActive ? (
            <p className="text-sm text-muted">School day is over</p>
          ) : (
            <>
              <div className="space-y-2">
                {data.data.schools.map((school, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{school.boardShort}</span>
                    <Badge
                      variant={school.status === "open" ? "success" : school.status === "delayed" ? "warning" : "danger"}
                    >
                      {school.status === "open" ? "All Open" : school.status === "delayed" ? "Delayed" : "CLOSED"}
                    </Badge>
                  </div>
                ))}
              </div>
              {data.data.busCancellations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bus className="w-3.5 h-3.5 text-warning" />
                    <span className="text-xs font-medium text-warning">Bus Cancellations</span>
                  </div>
                  {data.data.busCancellations.map((route, i) => (
                    <p key={i} className="text-xs text-muted">{route}</p>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
}
