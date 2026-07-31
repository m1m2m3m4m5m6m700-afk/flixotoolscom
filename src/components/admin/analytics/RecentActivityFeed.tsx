import { useState, useEffect } from "react";
import {
  Activity,
  Eye,
  Search,
  Wrench,
  Download,
  Copy,
  ExternalLink,
  Radio,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ActivityEvent } from "./types";

interface RecentActivityFeedProps {
  initialEvents: ActivityEvent[];
}

const EVENT_CONFIG: Record<
  ActivityEvent["type"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  page_view: {
    label: "Pageview",
    color: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    icon: <Eye className="size-3.5" />,
  },
  search: {
    label: "Search",
    color: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    icon: <Search className="size-3.5" />,
  },
  tool_click: {
    label: "Tool Used",
    color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    icon: <Wrench className="size-3.5" />,
  },
  category_click: {
    label: "Category",
    color: "bg-purple-500/15 text-purple-500 border-purple-500/30",
    icon: <Activity className="size-3.5" />,
  },
  download: {
    label: "Download",
    color: "bg-teal-500/15 text-teal-500 border-teal-500/30",
    icon: <Download className="size-3.5" />,
  },
  copy: {
    label: "Copy Action",
    color: "bg-cyan-500/15 text-cyan-500 border-cyan-500/30",
    icon: <Copy className="size-3.5" />,
  },
  external_link: {
    label: "External Link",
    color: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30",
    icon: <ExternalLink className="size-3.5" />,
  },
};

const RANDOM_EVENTS: Array<Omit<ActivityEvent, "id" | "timestamp">> = [
  {
    type: "tool_click",
    title: "Opened Image Compressor",
    detail: "Compressed WebP image (reduced 64%)",
    country: "United States",
    flag: "🇺🇸",
    device: "Desktop (Chrome)",
  },
  {
    type: "search",
    title: "Searched for 'pdf convert'",
    detail: "Found 3 tool matches",
    country: "Germany",
    flag: "🇩🇪",
    device: "Desktop (Firefox)",
  },
  {
    type: "copy",
    title: "Copied Password",
    detail: "Generated 16-char secure password",
    country: "United Kingdom",
    flag: "🇬🇧",
    device: "Mobile (Safari)",
  },
  {
    type: "page_view",
    title: "Visited /tools/translator",
    detail: "Language selector used",
    country: "Japan",
    flag: "🇯🇵",
    device: "Desktop (Edge)",
  },
  {
    type: "download",
    title: "Downloaded QR Code PNG",
    detail: "Custom transparent QR code",
    country: "Canada",
    flag: "🇨🇦",
    device: "Desktop (Chrome)",
  },
  {
    type: "tool_click",
    title: "Opened Background Remover",
    detail: "High resolution AI mask",
    country: "France",
    flag: "🇫🇷",
    device: "Desktop (Safari)",
  },
];

export function RecentActivityFeed({ initialEvents }: RecentActivityFeedProps) {
  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents);
  const [isLive, setIsLive] = useState(true);

  // Live simulation streamer
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const template = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      const newEvent: ActivityEvent = {
        ...template,
        id: `event-live-${Date.now()}-${Math.random()}`,
        timestamp: "Just now",
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 p-5 backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500 font-bold">
            <Radio className="size-4 animate-pulse" />
          </span>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Real-Time Visitor Activity Feed
              <Badge
                variant="outline"
                className="text-xs font-semibold border-emerald-500/30 text-emerald-500"
              >
                Live Feed
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground">
              Stream of live user actions, searches, downloads, and tool usages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive((v) => !v)}
            className={`rounded-xl text-xs font-bold transition-colors ${
              isLive
                ? "border-emerald-500/40 text-emerald-500 bg-emerald-500/5"
                : "text-muted-foreground"
            }`}
          >
            <span
              className={`me-1.5 size-2 rounded-full ${isLive ? "bg-emerald-500 animate-ping" : "bg-muted-foreground"}`}
            />
            {isLive ? "Live Sync: Active" : "Paused"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const template = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
              const newEvent: ActivityEvent = {
                ...template,
                id: `event-manual-${Date.now()}`,
                timestamp: "Just now",
              };
              setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
            }}
            className="size-8 rounded-xl"
            title="Trigger mock live event"
          >
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Stream List */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {events.map((evt) => {
          const config = EVENT_CONFIG[evt.type] || EVENT_CONFIG.page_view;
          return (
            <div
              key={evt.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-surface/40 p-3 transition-colors hover:bg-surface hover:border-border"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-lg shrink-0">{evt.flag}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-foreground truncate">{evt.title}</span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] px-1.5 py-0 font-semibold flex items-center gap-1 ${config.color}`}
                    >
                      {config.icon}
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{evt.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground shrink-0 ms-auto sm:ms-0">
                <span className="hidden md:inline-block font-medium">{evt.country}</span>
                <span className="hidden sm:inline-block font-mono text-[10px] bg-card px-2 py-0.5 rounded-md border border-border/60">
                  {evt.device}
                </span>
                <span className="font-semibold text-foreground text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                  {evt.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
