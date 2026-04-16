"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ShowMoreProps {
  children: React.ReactNode;
  visibleCount: number;
  items: unknown[];
}

export function ShowMore({ children, visibleCount, items }: ShowMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > visibleCount;

  return (
    <div>
      {children}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-3 text-sm text-primary hover:text-primary-dim transition-colors"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show {items.length - visibleCount} more <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
