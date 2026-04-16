"use client";

import { useState, useEffect, useCallback } from "react";
import type { CardId } from "@/types";

const STORAGE_KEY = "barriepulse-pins";

export function usePinnedCards() {
  const [pinnedCards, setPinnedCards] = useState<CardId[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPinnedCards(JSON.parse(stored));
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const togglePin = useCallback((cardId: CardId) => {
    setPinnedCards((prev) => {
      const next = prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage not available
      }
      return next;
    });
  }, []);

  const isPinned = useCallback(
    (cardId: CardId) => pinnedCards.includes(cardId),
    [pinnedCards]
  );

  return { pinnedCards, togglePin, isPinned };
}
