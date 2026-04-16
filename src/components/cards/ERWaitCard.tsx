"use client";

import { Siren } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getERWaitColor, classNames } from "@/lib/utils";
import type { ERWaitData, CachedData, CardId } from "@/types";

interface ERWaitCardProps {
  data: CachedData<ERWaitData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

export function ERWaitCard({ data, isLoading, error, isPinned, onTogglePin }: ERWaitCardProps) {
  return (
    <Card
      cardId="er-wait"
      title="ER Wait Times"
      icon={Siren}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
      footerLink={{ label: "Check RVH website", href: "https://bi.rvh.on.ca:444/SEQ_PublicFacing/" }}
    >
      {data && (
        <div>
          <p className="text-xs text-muted mb-2">{data.data.hospitalName}</p>
          <p className={classNames("text-4xl font-bold", getERWaitColor(data.data.waitMinutes))}>
            {data.data.waitTime}
          </p>
          <p className="text-xs text-muted mt-1">estimated wait</p>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted">
              Consider walk-in clinics or call <span className="text-foreground font-medium">8-1-1</span> for non-emergencies.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
