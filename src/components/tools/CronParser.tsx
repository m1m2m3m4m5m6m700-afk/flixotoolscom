import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Clock, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { trackCopyAction } from "@/lib/analytics";

interface CronPart {
  value: string;
  name: string;
  min: number;
  max: number;
}

const CRON_PARTS: CronPart[] = [
  { value: "minute", name: "Minute", min: 0, max: 59 },
  { value: "hour", name: "Hour", min: 0, max: 23 },
  { value: "day", name: "Day of Month", min: 1, max: 31 },
  { value: "month", name: "Month", min: 1, max: 12 },
  { value: "weekday", name: "Day of Week", min: 0, max: 6 },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function parseCronPart(value: string, part: CronPart): string[] {
  if (!value || value === "*") {
    return [`Every ${part.name.toLowerCase()}`];
  }

  const results: string[] = [];

  // Handle step values (*/5, 0-30/5)
  if (value.includes("/")) {
    const [range, step] = value.split("/");
    const stepNum = parseInt(step);

    if (range === "*") {
      for (let i = part.min; i <= part.max; i += stepNum) {
        results.push(String(i));
      }
    } else if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      for (let i = start; i <= end; i += stepNum) {
        results.push(String(i));
      }
    }
    return results.length <= 10
      ? results
      : [
          `Every ${stepNum} ${part.name.toLowerCase()}s from ${results[0]} to ${results[results.length - 1]}`,
        ];
  }

  // Handle lists (1,3,5)
  if (value.includes(",")) {
    const values = value.split(",");
    return values.map((v) => {
      if (part.name === "Month") return MONTH_NAMES[parseInt(v) - 1] || v;
      if (part.name === "Day of Week") return DAY_NAMES[parseInt(v)] || v;
      return v;
    });
  }

  // Handle ranges (1-5)
  if (value.includes("-")) {
    const [start, end] = value.split("-").map(Number);
    const rangeValues = [];
    for (let i = start; i <= end; i++) {
      rangeValues.push(i);
    }
    if (part.name === "Month") {
      return [`${MONTH_NAMES[start - 1]} to ${MONTH_NAMES[end - 1]}`];
    }
    if (part.name === "Day of Week") {
      return [`${DAY_NAMES[start]} to ${DAY_NAMES[end]}`];
    }
    return rangeValues.length <= 10 ? rangeValues.map(String) : [`${start} through ${end}`];
  }

  // Single value
  const num = parseInt(value);
  if (part.name === "Month" && num >= 1 && num <= 12) {
    return [MONTH_NAMES[num - 1]];
  }
  if (part.name === "Day of Week" && num >= 0 && num <= 6) {
    return [DAY_NAMES[num]];
  }

  return [value];
}

function describeCron(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression";

  const [minute, hour, day, month, weekday] = parts;

  const descriptions: string[] = [];

  // Time
  if (minute === "*" && hour === "*") {
    descriptions.push("Every minute");
  } else if (minute === "0" && hour === "*") {
    descriptions.push("Every hour at minute 0");
  } else if (minute !== "*" && hour === "*") {
    const mins = parseCronPart(minute, CRON_PARTS[0]);
    descriptions.push(`At minute ${mins.join(", ")} of every hour`);
  } else if (minute === "*" && hour !== "*") {
    const hrs = parseCronPart(hour, CRON_PARTS[1]);
    descriptions.push(`Every minute during ${hrs.join(", ")} hour(s)`);
  } else if (minute !== "*" && hour !== "*") {
    const mins = parseCronPart(minute, CRON_PARTS[0]);
    const hrs = parseCronPart(hour, CRON_PARTS[1]);
    descriptions.push(`At ${hrs.join(", ")}:${mins.join(", ").padStart(2, "0")}`);
  }

  // Day of month
  if (day !== "*") {
    const days = parseCronPart(day, CRON_PARTS[2]);
    descriptions.push(`on day ${days.join(", ")} of the month`);
  }

  // Month
  if (month !== "*") {
    const months = parseCronPart(month, CRON_PARTS[3]);
    descriptions.push(`in ${months.join(", ")}`);
  }

  // Day of week
  if (weekday !== "*") {
    const days = parseCronPart(weekday, CRON_PARTS[4]);
    descriptions.push(`on ${days.join(", ")}`);
  }

  return descriptions.join(" ") || "Every minute";
}

function getNextRuns(cron: string, count: number = 5): Date[] {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const runs: Date[] = [];
  let date = new Date();
  date.setSeconds(0, 0);

  for (let i = 0; i < 100 && runs.length < count; i++) {
    date = new Date(date.getTime() + 60000); // Add 1 minute

    const [minute, hour, day, month, weekday] = parts;

    const matchMinute = minute === "*" || checkMatch(parseInt(String(date.getMinutes())), minute);
    const matchHour = hour === "*" || checkMatch(parseInt(String(date.getHours())), hour);
    const matchDay = day === "*" || checkMatch(date.getDate(), day);
    const matchMonth = month === "*" || checkMatch(date.getMonth() + 1, month);
    const matchWeekday = weekday === "*" || checkMatch(date.getDay(), weekday);

    if (matchMinute && matchHour && matchDay && matchMonth && matchWeekday) {
      runs.push(new Date(date));
    }
  }

  return runs;
}

function checkMatch(value: number, pattern: string): boolean {
  if (pattern.includes(",")) {
    return pattern.split(",").some((p) => checkMatch(value, p));
  }
  if (pattern.includes("-")) {
    const [start, end] = pattern.split("-").map(Number);
    return value >= start && value <= end;
  }
  if (pattern.includes("/")) {
    const [, step] = pattern.split("/");
    return value % parseInt(step) === 0;
  }
  return parseInt(pattern) === value;
}

export function CronParser() {
  const [expression, setExpression] = useState("0 * * * *");
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    if (!expression.trim()) return null;

    const parts = expression.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { error: "Cron expression must have exactly 5 parts" };
    }

    return {
      description: describeCron(expression),
      parts: parts.map((value, i) => ({
        name: CRON_PARTS[i].name,
        value,
        description: parseCronPart(value, CRON_PARTS[i]).join(", "),
      })),
      nextRuns: getNextRuns(expression, 5),
    };
  }, [expression]);

  const handleCopy = async () => {
    if (!expression) return;
    try {
      await navigator.clipboard.writeText(expression);
      trackCopyAction("cron-parser", expression.length, "cron-parser");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const presets = [
    { label: "Every minute", value: "* * * * *" },
    { label: "Every hour", value: "0 * * * *" },
    { label: "Every day midnight", value: "0 0 * * *" },
    { label: "Every week", value: "0 0 * * 0" },
    { label: "Every month", value: "0 0 1 * *" },
    { label: "Every 5 min", value: "*/5 * * * *" },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cron Expression
        </Label>
        <div className="flex gap-2">
          <Input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="* * * * *"
            className="font-mono text-lg text-center"
          />
          <Button onClick={handleCopy} variant="outline" size="icon">
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
          </Button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Format: minute hour day-of-month month day-of-week
        </p>
      </div>

      {/* Presets */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Common Presets
        </Label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              variant={expression === preset.value ? "default" : "outline"}
              size="sm"
              onClick={() => setExpression(preset.value)}
              className="text-xs"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Result */}
      {parsed && "error" in parsed && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          {parsed.error}
        </div>
      )}

      {parsed && !("error" in parsed) && (
        <>
          {/* Description */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Schedule Description</span>
            </div>
            <p className="text-lg font-medium">{parsed.description}</p>
          </div>

          {/* Parts Breakdown */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Expression Breakdown
            </Label>
            <div className="grid gap-2 sm:grid-cols-5">
              {parsed.parts.map((part, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/60 bg-surface/40 p-3 text-center"
                >
                  <p className="text-xs text-muted-foreground">{part.name}</p>
                  <p className="font-mono font-bold text-primary">{part.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{part.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Runs */}
          {parsed.nextRuns.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Next {parsed.nextRuns.length} Executions
              </Label>
              <div className="space-y-2">
                {parsed.nextRuns.map((run, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface/40 p-3"
                  >
                    <Calendar className="size-4 text-muted-foreground shrink-0" />
                    <span className="font-mono text-sm">
                      {run.toLocaleString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
