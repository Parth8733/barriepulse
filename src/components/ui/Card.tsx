"use client";

import { PinButton } from "@/components/ui/PinButton";
import { Timestamp } from "@/components/ui/Timestamp";
import { CardSkeleton } from "@/components/ui/Skeleton";
import type { CardId } from "@/types";
import type { LucideIcon } from "lucide-react";

interface CardProps {
  cardId: CardId;
  title: string;
  icon: LucideIcon;
  fetchedAt?: string;
  isPinned: boolean;
  onTogglePin: (cardId: CardId) => void;
  isLoading?: boolean;
  error?: boolean;
  footerLink?: { label: string; href: string };
  children: React.ReactNode;
}

export function Card({
  cardId,
  title,
  icon: Icon,
  fetchedAt,
  isPinned,
  onTogglePin,
  isLoading,
  error,
  footerLink,
  children,
}: CardProps) {
  if (isLoading) return <CardSkeleton />;

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PinButton cardId={cardId} isPinned={isPinned} onToggle={onTogglePin} />
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <Timestamp dateString={fetchedAt} />
      </div>

      {/* Content */}
      <div className="flex-1">
        {error ? (
          <p className="text-sm text-muted">Temporarily unavailable</p>
        ) : (
          children
        )}
      </div>

      {/* Footer link */}
      {footerLink && (
        <a
          href={footerLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-border text-xs text-primary hover:text-primary-dim transition-colors flex items-center gap-1"
        >
          {footerLink.label} →
        </a>
      )}
    </div>
  );
}
