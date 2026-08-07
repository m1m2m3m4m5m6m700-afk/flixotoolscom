import { useState } from "react";
import { Label } from "@/components/ui/label";

export function StringDiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const findDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLines = Math.max(lines1.length, lines2.length);
    const result: {
      line: number;
      type: "same" | "removed" | "added" | "changed";
      content1?: string;
      content2?: string;
    }[] = [];

    for (let i = 0; i < maxLines; i++) {
      const l1 = lines1[i] || "";
      const l2 = lines2[i] || "";

      if (l1 === l2) {
        result.push({ line: i + 1, type: "same", content1: l1, content2: l2 });
      } else if (!lines1[i] && lines2[i]) {
        result.push({ line: i + 1, type: "added", content2: l2 });
      } else if (lines1[i] && !lines2[i]) {
        result.push({ line: i + 1, type: "removed", content1: l1 });
      } else {
        result.push({ line: i + 1, type: "changed", content1: l1, content2: l2 });
      }
    }

    return result;
  };

  const diff = text1 || text2 ? findDiff() : [];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Original Text
          </Label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
            placeholder="Original text..."
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Modified Text
          </Label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
            placeholder="Modified text..."
          />
        </div>
      </div>

      {diff.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-muted p-3 font-semibold text-sm flex justify-between">
            <span>Line-by-line Comparison</span>
            <span className="text-xs text-muted-foreground font-normal">
              {diff.filter((d) => d.type === "same").length} same,{" "}
              {diff.filter((d) => d.type === "changed").length} changed,{" "}
              {diff.filter((d) => d.type === "removed").length} removed,{" "}
              {diff.filter((d) => d.type === "added").length} added
            </span>
          </div>
          <div className="max-h-[300px] overflow-y-auto font-mono text-sm">
            {diff.map(({ line, type, content1, content2 }) => (
              <div key={line} className="flex border-t border-border">
                <span className="w-12 px-2 py-1 text-muted-foreground bg-muted/50 border-r border-border text-xs">
                  {line}
                </span>
                {type === "same" && <div className="flex-1 px-2 py-1">{content1}</div>}
                {type === "removed" && (
                  <div className="flex-1 px-2 py-1 bg-red-500/10 text-red-600">{content1}</div>
                )}
                {type === "added" && (
                  <div className="flex-1 px-2 py-1 bg-emerald-500/10 text-emerald-600">
                    {content2}
                  </div>
                )}
                {type === "changed" && (
                  <div className="flex-1 px-2 py-1 bg-amber-500/10">
                    <div className="line-through text-red-600">{content1}</div>
                    <div className="text-emerald-600">{content2}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
