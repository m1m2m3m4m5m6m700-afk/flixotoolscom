import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

export function TimeBetweenDates() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
    businessDays: number;
  } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = Math.abs(end.getTime() - start.getTime());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Calculate business days
    let businessDays = 0;
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) businessDays++;
      current.setDate(current.getDate() + 1);
    }

    setResult({
      days,
      hours,
      minutes,
      seconds,
      totalDays: Math.floor(diff / (1000 * 60 * 60 * 24)),
      totalHours: Math.floor(diff / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diff / (1000 * 60)),
      totalSeconds: Math.floor(diff / 1000),
      businessDays,
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Start Date
          </Label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            End Date
          </Label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        disabled={!startDate || !endDate}
        className="w-full rounded-xl bg-primary text-primary-foreground p-3 font-medium disabled:opacity-50"
      >
        Calculate
      </button>

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-5xl font-bold text-primary">{result.days}</p>
            <p className="text-muted-foreground mt-1">days between dates</p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Days", value: result.days },
              { label: "Hours", value: result.hours },
              { label: "Minutes", value: result.minutes },
              { label: "Seconds", value: result.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-muted/30 p-3 text-center"
              >
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Days</span>
              <span className="font-mono">{result.totalDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Hours</span>
              <span className="font-mono">{result.totalHours.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Minutes</span>
              <span className="font-mono">{result.totalMinutes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Business Days (Mon-Fri)</span>
              <span className="font-mono">{result.businessDays}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
