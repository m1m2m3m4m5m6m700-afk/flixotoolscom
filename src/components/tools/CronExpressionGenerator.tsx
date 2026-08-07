import { useState } from "react";
import { Label } from "@/components/ui/label";

const PRESETS = [
  { name: "Every minute", cron: "* * * * *", desc: "Runs every minute" },
  { name: "Every hour", cron: "0 * * * *", desc: "Runs at the start of every hour" },
  { name: "Every day", cron: "0 0 * * *", desc: "Runs at midnight every day" },
  { name: "Every week", cron: "0 0 * * 0", desc: "Runs at midnight every Sunday" },
  { name: "Every month", cron: "0 0 1 * *", desc: "Runs at midnight on the 1st of every month" },
  { name: "Weekdays", cron: "0 9 * * 1-5", desc: "Runs at 9 AM Monday through Friday" },
  { name: "Weekends", cron: "0 9 * * 0,6", desc: "Runs at 9 AM on weekends" },
];

export function CronExpressionGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const getNextRuns = (expr: string): string[] => {
    const runs: string[] = [];
    const now = new Date();
    let date = new Date(now);

    for (let i = 0; i < 5; i++) {
      date = new Date(date.getTime() + 60000);
      runs.push(date.toLocaleString());
    }
    return runs;
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Presets
        </Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                const parts = preset.cron.split(" ");
                setMinute(parts[0]);
                setHour(parts[1]);
                setDayOfMonth(parts[2]);
                setMonth(parts[3]);
                setDayOfWeek(parts[4]);
              }}
              className="rounded-lg border border-border p-3 text-left hover:border-primary transition-colors"
            >
              <p className="font-medium text-sm">{preset.name}</p>
              <p className="text-xs text-muted-foreground">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Generated Expression
        </p>
        <code className="text-2xl font-mono font-bold">{cron}</code>
      </div>

      <div className="grid gap-4 sm:grid-cols-5">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Minute
          </Label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2 text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hour
          </Label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2 text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Day
          </Label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2 text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Month
          </Label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2 text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Weekday
          </Label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2 text-center font-mono"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Field Reference
        </Label>
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1">
          <p>
            <strong>Minute:</strong> 0-59 | <strong>Hour:</strong> 0-23 | <strong>Day:</strong> 1-31
          </p>
          <p>
            <strong>Month:</strong> 1-12 | <strong>Weekday:</strong> 0-6 (Sun-Sat)
          </p>
          <p>
            <strong>Special:</strong> * (any), */n (every n), n-m (range), n,m (list)
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Next 5 Runs
        </Label>
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm space-y-1">
          {getNextRuns(cron).map((run, i) => (
            <p key={i} className="font-mono">
              {run}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
