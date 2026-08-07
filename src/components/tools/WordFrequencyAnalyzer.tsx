import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";

export function WordFrequencyAnalyzer() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(10);

  const results = useMemo(() => {
    if (!text.trim()) return [];

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 2);

    const frequency: Record<string, number> = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count);
  }, [text, count]);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 text-sm"
          placeholder="Paste or type text to analyze word frequency..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Show Top Words
        </Label>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-background p-3"
        >
          {[5, 10, 15, 20, 25, 50].map((n) => (
            <option key={n} value={n}>
              {n} words
            </option>
          ))}
        </select>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Word Frequency
          </Label>
          <div className="space-y-1 max-h-[300px] overflow-y-auto">
            {results.map(([word, freq], i) => (
              <div key={word} className="flex items-center gap-3">
                <span className="w-6 text-xs text-muted-foreground text-right">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{word}</span>
                    <span className="text-xs text-muted-foreground">{freq}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(freq / results[0][1]) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
