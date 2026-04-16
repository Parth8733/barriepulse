"use client";

import { timeAgo } from "@/lib/utils";

interface TimestampProps {
  dateString: string | undefined;
}

export function Timestamp({ dateString }: TimestampProps) {
  if (!dateString) return null;
  return (
    <span className="text-xs text-muted" title={dateString}>
      {timeAgo(dateString)}
    </span>
  );
}
