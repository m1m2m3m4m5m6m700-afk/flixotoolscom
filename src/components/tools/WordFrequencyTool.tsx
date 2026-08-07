"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface WordCount {
  word: string;
  count: number;
}

export function WordFrequencyTool() {
  const [input, setInput] = useState("");
  const [wordCounts, setWordCounts] = useState<WordCount[]>([]);
  const [copied, setCopied] = useState(false);
  const [sortBy, setSortBy] = useState<"count" | "alphabetical">("count");
  const [minLength, setMinLength] = useState(0);

  const analyzeFrequency = useCallback(() => {
    const words = input
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= minLength);

    const frequency: Record<string, number> = {};
    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    const sorted = Object.entries(frequency)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => (sortBy === "count" ? b.count - a.count : a.word.localeCompare(b.word)));

    setWordCounts(sorted);
  }, [input, sortBy, minLength]);

  const handleCopy = async () => {
    const text = wordCounts.map((w) => `${w.word}: ${w.count}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = wordCounts.map((w) => `${w.word}\t${w.count}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setWordCounts([]);
  };

  const totalWords = wordCounts.reduce((sum, w) => sum + w.count, 0);
  const uniqueWords = wordCounts.length;
  const maxCount = wordCounts[0]?.count || 1;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Options
        </Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setSortBy("count")}
              variant={sortBy === "count" ? "default" : "outline"}
              size="sm"
            >
              By Count
            </Button>
            <Button
              onClick={() => setSortBy("alphabetical")}
              variant={sortBy === "alphabetical" ? "default" : "outline"}
              size="sm"
            >
              A-Z
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">Min length:</Label>
            <input
              type="number"
              min="0"
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
              className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input Text
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Word Frequency
            </Label>
            {wordCounts.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {totalWords} words | {uniqueWords} unique
              </span>
            )}
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 overflow-hidden">
            {wordCounts.length > 0 ? (
              <div className="max-h-[200px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Word</th>
                      <th className="px-3 py-2 text-center font-medium">Count</th>
                      <th className="px-3 py-2 text-right font-medium">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordCounts.slice(0, 100).map(({ word, count }) => (
                      <tr key={word} className="border-t border-border">
                        <td className="px-3 py-1.5 font-medium">{word}</td>
                        <td className="px-3 py-1.5 text-center">{count}</td>
                        <td className="px-3 py-1.5">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {wordCounts.length > 100 && (
                  <p className="text-center text-xs text-muted-foreground py-2">
                    Showing top 100 of {wordCounts.length} words
                  </p>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <BarChart3 className="size-8 mb-2 opacity-40" />
                <span>Word frequency will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={analyzeFrequency} disabled={!input} size="sm">
          Analyze Frequency
        </Button>
        {wordCounts.length > 0 && (
          <>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </>
        )}
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
