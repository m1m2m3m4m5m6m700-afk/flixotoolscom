import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";

export function DuplicateCharacterFinder() {
  const [text, setText] = useState("");

  const duplicates = useMemo(() => {
    if (!text) return [];

    const charCount: Record<string, number> = {};
    for (const char of text) {
      if (char !== " ") {
        charCount[char] = (charCount[char] || 0) + 1;
      }
    }

    return Object.entries(charCount)
      .filter(([_, count]) => count > 1)
      .sort((a, b) => b[1] - a[1]);
  }, [text]);

  const uniqueChars = useMemo(() => {
    if (!text) return 0;
    return new Set(text.replace(/\s/g, "")).size;
  }, [text]);

  const totalChars = useMemo(() => {
    if (!text) return 0;
    return text.replace(/\s/g, "").length;
  }, [text]);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text to find duplicate characters..."
        />
      </div>

      {text && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface/40 p-3">
            <p className="text-lg font-bold">{totalChars}</p>
            <p className="text-xs text-muted-foreground">Total Characters</p>
          </div>
          <div className="rounded-xl border border-border bg-surface/40 p-3">
            <p className="text-lg font-bold">{uniqueChars}</p>
            <p className="text-xs text-muted-foreground">Unique Characters</p>
          </div>
          <div className="rounded-xl border border-border bg-surface/40 p-3">
            <p className="text-lg font-bold">{duplicates.length}</p>
            <p className="text-xs text-muted-foreground">Duplicate Characters</p>
          </div>
        </div>
      )}

      {duplicates.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Duplicate Characters
          </Label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {duplicates.slice(0, 20).map(([char, count]) => (
              <div
                key={char}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-2"
              >
                <span className="text-2xl font-bold">{char === " " ? "␣" : char}</span>
                <span className="text-sm text-muted-foreground">×{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
