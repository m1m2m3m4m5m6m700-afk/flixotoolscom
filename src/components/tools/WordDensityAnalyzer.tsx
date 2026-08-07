import { useState } from "react";
import { Label } from "@/components/ui/label";

export function WordDensityAnalyzer() {
  const [text, setText] = useState("");

  const analyze = () => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const frequency: Record<string, number> = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    const totalWords = words.length;
    const uniqueWords = Object.keys(frequency).length;

    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2),
      }));

    return { totalWords, uniqueWords, topWords: sorted };
  };

  const result = text.trim() ? analyze() : null;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3"
          placeholder="Paste your text here to analyze word density..."
        />
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{result.totalWords}</p>
              <p className="text-xs text-muted-foreground">Total Words</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{result.uniqueWords}</p>
              <p className="text-xs text-muted-foreground">Unique Words</p>
            </div>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-muted p-3 font-semibold text-sm">Top 20 Words</div>
            <div className="divide-y divide-border max-h-[300px] overflow-y-auto">
              {result.topWords.map(({ word, count, density }) => (
                <div key={word} className="flex items-center gap-4 p-3">
                  <span className="flex-1 font-medium">{word}</span>
                  <span className="text-muted-foreground text-sm">
                    {parseFloat(density).toFixed(1)}%
                  </span>
                  <span className="font-mono text-sm">{count}x</span>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${Math.min(100, parseFloat(density) * 10)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!result && (
        <div className="rounded-xl border border-border bg-muted/30 p-8 text-center text-muted-foreground">
          Enter text to analyze word density
        </div>
      )}
    </div>
  );
}
