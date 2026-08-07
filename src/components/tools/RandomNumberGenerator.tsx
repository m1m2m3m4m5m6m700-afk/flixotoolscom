import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, RefreshCw, Hash, Shuffle } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [unique, setUnique] = useState(true);

  const generate = useCallback(() => {
    if (min >= max) return;

    const results: number[] = [];
    const range = max - min + 1;

    if (unique && count > range) {
      // Not enough unique numbers available
      setNumbers([]);
      return;
    }

    const used = new Set<number>();

    for (let i = 0; i < count; i++) {
      let num: number;
      if (unique) {
        do {
          num = Math.floor(Math.random() * range) + min;
        } while (used.has(num));
        used.add(num);
      } else {
        num = Math.floor(Math.random() * range) + min;
      }
      results.push(num);
    }

    setNumbers(results);
  }, [min, max, count, unique]);

  const handleCopy = async () => {
    if (!numbers.length) return;
    const text = numbers.join(", ");
    try {
      await navigator.clipboard.writeText(text);
      trackCopyAction("random-number", text.length, "random-number-generator");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!numbers.length) return;
    const text = numbers.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `random-numbers-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction(
      `random-numbers-${Date.now()}.txt`,
      "text/plain",
      "random-number-generator",
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Range Inputs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Minimum
          </Label>
          <Input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Maximum
          </Label>
          <Input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Count
          </Label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={1000}
            className="font-mono"
          />
        </div>
      </div>

      {/* Unique Toggle */}
      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 p-3">
        <input
          type="checkbox"
          id="unique"
          checked={unique}
          onChange={(e) => setUnique(e.target.checked)}
          className="size-4 rounded border-border"
        />
        <label htmlFor="unique" className="text-sm font-medium">
          Generate unique numbers only
        </label>
        {!unique && (
          <span className="text-xs text-muted-foreground ml-auto">(duplicates allowed)</span>
        )}
      </div>

      {/* Generate Button */}
      <Button onClick={generate} className="w-full">
        <Shuffle className="mr-2 size-4" />
        Generate Random Number{count > 1 ? "s" : ""}
      </Button>

      {/* Results */}
      {numbers.length > 0 && (
        <div>
          <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Generated Number{numbers.length > 1 ? "s" : ""}
          </Label>
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            {count === 1 ? (
              <p className="text-center text-4xl font-bold font-mono text-primary">{numbers[0]}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {numbers.map((num, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-border/60 bg-card px-3 py-1.5 font-mono text-sm font-semibold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {numbers.length > 1 && (
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
            <p className="text-lg font-bold">{Math.min(...numbers)}</p>
            <p className="text-xs text-muted-foreground">Minimum</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
            <p className="text-lg font-bold">{Math.max(...numbers)}</p>
            <p className="text-xs text-muted-foreground">Maximum</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
            <p className="text-lg font-bold">
              {(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
            <p className="text-lg font-bold">{numbers.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          disabled={!numbers.length}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!numbers.length}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
