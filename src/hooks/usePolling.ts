"use client";

import useSWR from "swr";
import type { CachedData } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePolling<T>(
  endpoint: string | null,
  refreshInterval: number
) {
  return useSWR<CachedData<T>>(endpoint, fetcher, {
    refreshInterval,
    dedupingInterval: refreshInterval / 2,
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });
}
