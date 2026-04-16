"use client";

import { Pin, PinOff } from "lucide-react";
import type { CardId } from "@/types";

interface PinButtonProps {
  cardId: CardId;
  isPinned: boolean;
  onToggle: (cardId: CardId) => void;
}

export function PinButton({ cardId, isPinned, onToggle }: PinButtonProps) {
  return (
    <button
      onClick={() => onToggle(cardId)}
      className="p-1 rounded-md transition-colors hover:bg-card-hover text-muted hover:text-primary"
      aria-label={isPinned ? `Unpin ${cardId}` : `Pin ${cardId}`}
      title={isPinned ? "Unpin from My Barrie" : "Pin to My Barrie"}
    >
      {isPinned ? (
        <Pin className="w-4 h-4 fill-primary text-primary" />
      ) : (
        <PinOff className="w-4 h-4" />
      )}
    </button>
  );
}
