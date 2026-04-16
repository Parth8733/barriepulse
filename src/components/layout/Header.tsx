"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(format(now, "h:mm a"));
      setDate(format(now, "EEEE, MMMM d"));
    }
    tick();
    const interval = setInterval(tick, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-primary">Barrie</span>
            <span className="text-foreground">Pulse</span>
          </h1>
          <span className="hidden sm:inline text-xs text-muted">
            Barrie, right now.
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{time}</div>
          <div className="text-xs text-muted">{date}</div>
        </div>
      </div>
    </header>
  );
}
