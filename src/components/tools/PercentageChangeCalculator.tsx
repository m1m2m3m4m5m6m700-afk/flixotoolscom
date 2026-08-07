import { useState } from "react";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const calculateChange = () => {
    const old = parseFloat(oldValue);
    const newV = parseFloat(newValue);
    if (isNaN(old) || isNaN(newV) || old === 0) return null;

    const absoluteChange = newV - old;
    const percentChange = ((newV - old) / Math.abs(old)) * 100;

    return { absoluteChange, percentChange };
  };

  const result = calculateChange();

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Old Value
          </Label>
          <input
            type="number"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-lg"
            placeholder="100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            New Value
          </Label>
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-lg"
            placeholder="150"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div
            className={`rounded-xl border p-6 text-center ${
              result.percentChange > 0
                ? "border-emerald-500/30 bg-emerald-500/10"
                : result.percentChange < 0
                  ? "border-destructive/30 bg-destructive/10"
                  : "border-border bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {result.percentChange > 0 ? (
                <TrendingUp className="size-6 text-emerald-500" />
              ) : result.percentChange < 0 ? (
                <TrendingDown className="size-6 text-destructive" />
              ) : (
                <Minus className="size-6 text-muted-foreground" />
              )}
              <span className="text-4xl font-bold">
                {result.percentChange > 0 ? "+" : ""}
                {result.percentChange.toFixed(2)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Percentage Change</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Absolute Change
              </p>
              <p className="text-2xl font-mono font-bold mt-1">
                {result.absoluteChange > 0 ? "+" : ""}
                {result.absoluteChange.toFixed(2)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Multiplier</p>
              <p className="text-2xl font-mono font-bold mt-1">
                {(parseFloat(newValue) / parseFloat(oldValue)).toFixed(2)}x
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
