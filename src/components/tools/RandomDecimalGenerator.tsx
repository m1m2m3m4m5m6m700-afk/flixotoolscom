import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

export function RandomDecimalGenerator() {
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState(5);
  const [decimals, setDecimals] = useState(2);
  const [numbers, setNumbers] = useState<string[]>([]);

  const generate = () => {
    const minNum = parseFloat(min) || 0;
    const maxNum = parseFloat(max) || 100;
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      const num = minNum + Math.random() * (maxNum - minNum);
      results.push(num.toFixed(decimals));
    }

    setNumbers(results);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Minimum
          </Label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Maximum
          </Label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Count
          </Label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Decimal Places
          </Label>
          <input
            type="number"
            min="0"
            max="10"
            value={decimals}
            onChange={(e) => setDecimals(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
      </div>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate Numbers
      </Button>

      {numbers.length > 0 && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {numbers.map((num, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-background p-3 text-center font-mono"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {numbers.length > 0 && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Sum</span>
            <span className="font-mono">
              {numbers.reduce((acc, n) => acc + parseFloat(n), 0).toFixed(decimals)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Average</span>
            <span className="font-mono">
              {(numbers.reduce((acc, n) => acc + parseFloat(n), 0) / numbers.length).toFixed(
                decimals,
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Min</span>
            <span className="font-mono">
              {Math.min(...numbers.map((n) => parseFloat(n))).toFixed(decimals)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Max</span>
            <span className="font-mono">
              {Math.max(...numbers.map((n) => parseFloat(n))).toFixed(decimals)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
