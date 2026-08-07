import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

export function RandomDateGenerator() {
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [dates, setDates] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generateDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      const randomDate = new Date(randomTime);
      results.push(randomDate.toISOString().split("T")[0]);
    }

    setDates(results.sort());
  };

  const formats = [
    { label: "ISO", value: (d: string) => d },
    { label: "US", value: (d: string) => new Date(d).toLocaleDateString("en-US") },
    { label: "EU", value: (d: string) => new Date(d).toLocaleDateString("en-GB") },
    {
      label: "Long",
      value: (d: string) =>
        new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    },
  ];
  const [format, setFormat] = useState(0);

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

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Number of Dates
        </Label>
        <input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          className="w-full rounded-xl border border-border bg-background p-3"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Format
        </Label>
        <div className="flex gap-2">
          {formats.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setFormat(i)}
              className={`flex-1 rounded-lg border p-2 text-xs font-medium transition-colors ${
                format === i
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={generateDates} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate Random Dates
      </Button>

      {dates.length > 0 && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 max-h-[250px] overflow-auto space-y-1">
          {dates.map((date, i) => (
            <div key={i} className="flex justify-between text-sm font-mono">
              <span>{i + 1}.</span>
              <span>{formats[format].value(date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
