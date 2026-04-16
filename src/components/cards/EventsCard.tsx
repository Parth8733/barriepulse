"use client";

import { Calendar, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { EventsData, CachedData, CardId } from "@/types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EventsCardProps {
  data: CachedData<EventsData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

export function EventsCard({ data, isLoading, error, isPinned, onTogglePin }: EventsCardProps) {
  const [expanded, setExpanded] = useState(false);
  const events = data?.data.events ?? [];
  const visible = expanded ? events : events.slice(0, 3);
  const hasMore = events.length > 3;

  return (
    <Card
      cardId="events"
      title="Events"
      icon={Calendar}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
      footerLink={{ label: "Community events", href: "https://www.barrie.ca/community-recreation/events/community-events-calendar" }}
    >
      {data && (
        <div>
          <div className="space-y-3">
            {visible.map((evt, i) => (
              <a
                key={i}
                href={evt.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <p className="text-sm group-hover:text-primary transition-colors">
                  {evt.title}
                </p>
                <p className="text-xs text-muted flex items-center gap-1">
                  {evt.date} · {evt.venue}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </a>
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
        </div>
      )}
    </Card>
  );
}
