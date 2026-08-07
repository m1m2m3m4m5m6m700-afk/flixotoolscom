import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

export function RandomLotteryNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(49);
  const [count, setCount] = useState(6);
  const [unique, setUnique] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const results: number[] = [];
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (unique && results.includes(num)) {
        i--;
      } else {
        results.push(num);
      }
    }
    setNumbers(unique ? results.sort((a, b) => a - b) : results);
  };

  const PRESETS = [
    { name: "Powerball", min: 1, max: 69, count: 5, bonus: [1, 26] },
    { name: "Mega Millions", min: 1, max: 70, count: 5, bonus: [1, 25] },
    { name: "EuroMillions", min: 1, max: 50, count: 5, bonus: [1, 12] },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Presets
        </Label>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setMin(preset.min);
                setMax(preset.max);
                setCount(preset.count);
              }}
              className="rounded-lg border border-border p-2 text-center hover:border-primary transition-colors"
            >
              <p className="text-sm font-medium">{preset.name}</p>
              <p className="text-xs text-muted-foreground">
                {preset.min}-{preset.max}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Min
          </Label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 1)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-center"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Max
          </Label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 100)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-center"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Count
          </Label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-center"
          />
        </div>
      </div>

      <button
        onClick={() => setUnique(!unique)}
        className={`w-full rounded-lg border p-3 text-center text-sm font-medium transition-colors ${
          unique ? "border-primary bg-primary/10" : "border-border"
        }`}
      >
        {unique ? "✓ Unique numbers only" : "Allow duplicates"}
      </button>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate Numbers
      </Button>

      {numbers.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {numbers.map((num, i) => (
            <div
              key={i}
              className="size-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold"
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
