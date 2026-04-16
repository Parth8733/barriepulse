"use client";

import { Recycle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { CollectionData, CachedData, CardId } from "@/types";

interface CollectionCardProps {
  data: CachedData<CollectionData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

const binColors: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  grey: "bg-gray-500",
  gray: "bg-gray-500",
};

export function CollectionCard({ data, isLoading, error, isPinned, onTogglePin }: CollectionCardProps) {
  return (
    <Card
      cardId="collection"
      title="Curbside Collection"
      icon={Recycle}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
      footerLink={{ label: "Collection schedule", href: "https://www.barrie.ca/CurbsideCollection" }}
    >
      {data && (
        <div>
          <p className="text-xs text-muted mb-2">This week · {data.data.nextCollectionDate}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-4 h-4 rounded-full ${binColors[data.data.thisWeek.color] ?? "bg-gray-500"}`} />
            <span className="text-lg font-semibold">{data.data.thisWeek.type}</span>
          </div>
          <p className="text-sm text-muted">{data.data.thisWeek.items}</p>
          <div className="mt-3 pt-3 border-t border-border text-xs text-muted">
            Next week: {data.data.nextWeek.type}
          </div>
        </div>
      )}
    </Card>
  );
}
