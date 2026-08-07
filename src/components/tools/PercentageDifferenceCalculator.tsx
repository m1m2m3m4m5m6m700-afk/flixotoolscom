import { useState } from "react";
import { Label } from "@/components/ui/label";

export function PercentageDifferenceCalculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    if (isNaN(v1) || isNaN(v2) || v1 === 0) return null;

    const difference = v2 - v1;
    const percentChange = ((v2 - v1) / Math.abs(v1)) * 100;
    const average = (v1 + v2) / 2;
    const percentDiff = (Math.abs(v2 - v1) / average) * 100;

    return { difference, percentChange, percentDiff };
  };

  const result = calculate();

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Value A
          </Label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-4 font-mono text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Value B
          </Label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-4 font-mono text-lg"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Percentage Change
            </p>
            <p
              className={`text-4xl font-bold ${result.percentChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
            >
              {result.percentChange >= 0 ? "+" : ""}
              {result.percentChange.toFixed(2)}%
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Difference</p>
              <p className="text-xl font-bold font-mono">
                {result.difference >= 0 ? "+" : ""}
                {result.difference.toFixed(2)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">% Difference</p>
              <p className="text-xl font-bold font-mono">{result.percentDiff.toFixed(2)}%</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Ratio</p>
              <p className="text-xl font-bold font-mono">
                {value1 && value2 ? (parseFloat(value2) / parseFloat(value1)).toFixed(2) : "0"}x
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
            <p className="font-semibold mb-2">Comparison:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>% Change = ((B - A) / |A|) × 100</p>
              <p>% Difference = (|B - A| / ((A + B) / 2)) × 100</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
