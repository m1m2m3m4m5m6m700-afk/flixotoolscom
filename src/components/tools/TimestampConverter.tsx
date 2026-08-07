"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Clock, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [dateInput, setDateInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const currentDate = new Date(timestamp * 1000);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formats = [
    {
      label: "ISO 8601",
      value: currentDate.toISOString(),
      icon: Calendar,
    },
    {
      label: "UTC",
      value: currentDate.toUTCString(),
      icon: Clock,
    },
    {
      label: "Unix (seconds)",
      value: timestamp.toString(),
      icon: Hash,
    },
    {
      label: "Unix (milliseconds)",
      value: (timestamp * 1000).toString(),
      icon: Hash,
    },
    {
      label: "Local DateTime",
      value: formatDateTime(currentDate),
      icon: Calendar,
    },
    {
      label: "Date Only",
      value: currentDate.toLocaleDateString(),
      icon: Calendar,
    },
    {
      label: "Time Only",
      value: currentDate.toLocaleTimeString(),
      icon: Clock,
    },
    {
      label: "Relative",
      value: getRelativeTime(currentDate),
      icon: Clock,
    },
  ];

  function getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const absDiff = Math.abs(diff);
    const isFuture = diff > 0;

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ${isFuture ? "from now" : "ago"}`;
    if (months > 0)
      return `${months} month${months > 1 ? "s" : ""} ${isFuture ? "from now" : "ago"}`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ${isFuture ? "from now" : "ago"}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ${isFuture ? "from now" : "ago"}`;
    if (minutes > 0)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ${isFuture ? "from now" : "ago"}`;
    return `${seconds} second${seconds !== 1 ? "s" : ""} ${isFuture ? "from now" : "ago"}`;
  }

  const handleTimestampChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      // Handle both seconds and milliseconds
      if (num > 1e12) {
        setTimestamp(Math.floor(num / 1000));
      } else {
        setTimestamp(num);
      }
    }
  };

  const handleDateChange = (value: string) => {
    setDateInput(value);
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setTimestamp(Math.floor(date.getTime() / 1000));
      }
    } catch {
      // Invalid date
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000));
  };

  const handleReset = () => {
    setTimestamp(Math.floor(Date.now() / 1000));
    setDateInput("");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timestamp" className="text-sm font-medium">
              Unix Timestamp
            </Label>
            <div className="relative">
              <input
                id="timestamp"
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 pr-16 font-mono"
              />
              <Button
                onClick={handleNow}
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                Now
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateInput" className="text-sm font-medium">
              Date String
            </Label>
            <input
              id="dateInput"
              type="text"
              value={dateInput || currentDate.toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange(e.target.value)}
              placeholder="2024-01-15T10:30:00"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 font-mono"
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Current Time</p>
              <p className="text-2xl font-bold font-mono">{formatDateTime(currentDate)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Converted Formats
          </Label>
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2 max-h-[300px] overflow-y-auto">
            {formats.map((format) => (
              <div
                key={format.label}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <format.icon className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{format.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono truncate max-w-[200px]">{format.value}</span>
                  <Button
                    onClick={() => handleCopy(format.value)}
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                  >
                    {copied === format.value ? (
                      <Check className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
