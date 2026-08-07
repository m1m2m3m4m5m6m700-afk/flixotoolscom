import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight } from "lucide-react";

export function TextDiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const diff = useMemo(() => {
    if (!text1 && !text2) return { added: 0, removed: 0, unchanged: 0 };

    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);

    let added = 0;
    let removed = 0;
    const unchangedSet = new Set<string>();

    words2.forEach((word) => {
      if (!words1.includes(word)) added++;
      else unchangedSet.add(word);
    });

    words1.forEach((word) => {
      if (!words2.includes(word)) removed++;
    });

    const unchanged = text1.split(/\s+/).filter((w) => unchangedSet.has(w)).length;

    return { added, removed, unchanged };
  }, [text1, text2]);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Original Text
          </Label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 text-sm"
            placeholder="Enter original text..."
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Modified Text
          </Label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 text-sm"
            placeholder="Enter modified text..."
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ArrowLeftRight className="size-6 text-muted-foreground" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-500">{diff.added}</p>
          <p className="text-xs text-muted-foreground">Added</p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{diff.removed}</p>
          <p className="text-xs text-muted-foreground">Removed</p>
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-4 text-center">
          <p className="text-2xl font-bold">{diff.unchanged}</p>
          <p className="text-xs text-muted-foreground">Unchanged</p>
        </div>
      </div>
    </div>
  );
}
