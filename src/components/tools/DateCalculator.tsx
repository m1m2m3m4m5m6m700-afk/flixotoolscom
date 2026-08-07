import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function DateCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    setResult({ days, weeks, months, years });
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

      <Button onClick={calculate} disabled={!startDate || !endDate} className="w-full">
        Calculate Difference
      </Button>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-surface/40 p-4 text-center">
            <p className="text-2xl font-bold">{result.days}</p>
            <p className="text-xs text-muted-foreground">Days</p>
          </div>
          <div className="rounded-xl border border-border bg-surface/40 p-4 text-center">
            <p className="text-2xl font-bold">{result.weeks}</p>
            <p className="text-xs text-muted-foreground">Weeks</p>
          </div>
          <div className="rounded-xl border border-border bg-surface/40 p-4 text-center">
            <p className="text-2xl font-bold">{result.months}</p>
            <p className="text-xs text-muted-foreground">Months</p>
          </div>
          <div className="rounded-xl border border-border bg-surface/40 p-4 text-center">
            <p className="text-2xl font-bold">{result.years}</p>
            <p className="text-xs text-muted-foreground">Years</p>
          </div>
        </div>
      )}
    </div>
  );
}
