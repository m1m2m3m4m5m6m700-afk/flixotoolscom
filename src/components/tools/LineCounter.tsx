import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";

export function LineCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    if (!text) return null;

    const lines = text.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter((w) => w.length > 0).length;

    return {
      totalLines: lines.length,
      nonEmptyLines: nonEmptyLines.length,
      blankLines: lines.length - nonEmptyLines.length,
      characters,
      charactersNoSpaces,
      paragraphs,
      sentences,
      words,
    };
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
          className="min-h-[200px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Paste text to count lines..."
        />
      </div>

      {stats && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Lines" value={stats.totalLines} />
          <StatCard label="Non-Empty Lines" value={stats.nonEmptyLines} />
          <StatCard label="Blank Lines" value={stats.blankLines} />
          <StatCard label="Characters" value={stats.characters} />
          <StatCard label="No Spaces" value={stats.charactersNoSpaces} />
          <StatCard label="Words" value={stats.words} />
          <StatCard label="Sentences" value={stats.sentences} />
          <StatCard label="Paragraphs" value={stats.paragraphs} />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-3">
      <p className="text-lg font-bold">{value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
