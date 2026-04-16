"use client";

import { Newspaper, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { NewsData, CachedData, CardId } from "@/types";
import { useState } from "react";

interface NewsCardProps {
  data: CachedData<NewsData> | undefined;
  isLoading: boolean;
  error: boolean;
  isPinned: boolean;
  onTogglePin: (id: CardId) => void;
}

const sourceColors: Record<string, "info" | "success" | "warning"> = {
  CBC: "info",
  "City of Barrie": "success",
  BarrieToday: "warning",
};

export function NewsCard({ data, isLoading, error, isPinned, onTogglePin }: NewsCardProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const items = data?.data.items ?? [];
  const sources = [...new Set(items.map((i) => i.source))];
  const filtered = filter ? items.filter((i) => i.source === filter) : items;

  return (
    <Card
      cardId="news-cbc"
      title="News"
      icon={Newspaper}
      fetchedAt={data?.fetchedAt}
      isPinned={isPinned}
      onTogglePin={onTogglePin}
      isLoading={isLoading}
      error={error}
    >
      {data && (
        <div>
          {/* Source filter tabs */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              onClick={() => setFilter(null)}
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                filter === null ? "bg-primary text-background" : "text-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            {sources.map((src) => (
              <button
                key={src}
                onClick={() => setFilter(src)}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  filter === src ? "bg-primary text-background" : "text-muted hover:text-foreground"
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          {/* News items */}
          <div className="space-y-3">
            {filtered.slice(0, 5).map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={sourceColors[item.source] ?? "muted"}>
                        {item.source}
                      </Badge>
                      <span className="text-xs text-muted">{timeAgo(item.pubDate)}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted shrink-0 mt-1 group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
