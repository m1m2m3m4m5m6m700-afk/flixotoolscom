import { useState } from "react";
import { Label } from "@/components/ui/label";

const TIMEZONES = [
  { label: "New York (EST/EDT)", value: "America/New_York" },
  { label: "Los Angeles (PST/PDT)", value: "America/Los_Angeles" },
  { label: "Chicago (CST/CDT)", value: "America/Chicago" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Paris (CET/CEST)", value: "Europe/Paris" },
  { label: "Berlin (CET/CEST)", value: "Europe/Berlin" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Shanghai (CST)", value: "Asia/Shanghai" },
  { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Mumbai (IST)", value: "Asia/Kolkata" },
];

export function TimeZoneConverter() {
  const [baseTime, setBaseTime] = useState("09:00");
  const [baseZone, setBaseZone] = useState("America/New_York");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const getTimeInZone = (time: string, zone: string) => {
    try {
      const [hours, minutes] = time.split(":").map(Number);
      const d = new Date(`${date}T${time}:00`);
      return d.toLocaleTimeString("en-US", {
        timeZone: zone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "--:--";
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Base Time
          </Label>
          <input
            type="time"
            value={baseTime}
            onChange={(e) => setBaseTime(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Date
          </Label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Base Timezone
        </Label>
        <select
          value={baseZone}
          onChange={(e) => setBaseZone(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Converted Times
        </Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMEZONES.filter((tz) => tz.value !== baseZone).map((tz) => (
            <div
              key={tz.value}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-3"
            >
              <span className="text-xs text-muted-foreground truncate">
                {tz.label.split(" ")[0]}
              </span>
              <span className="font-medium">{getTimeInZone(baseTime, tz.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
