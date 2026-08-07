"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, GitCompare, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DiffLine {
  type: "same" | "added" | "removed";
  content: string;
  lineNum1?: number;
  lineNum2?: number;
}

const computeLCS = (arr1: string[], arr2: string[]): string[] => {
  const m = arr1.length;
  const n = arr2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcs: string[] = [];
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
};

const computeDiff = (lines1: string[], lines2: string[]): DiffLine[] => {
  const diff: DiffLine[] = [];
  const lcs = computeLCS(lines1, lines2);
  let i = 0,
    j = 0,
    k = 0;

  while (i < lines1.length || j < lines2.length) {
    if (k < lcs.length && i < lines1.length && lines1[i] === lcs[k]) {
      diff.push({ type: "same", content: lines1[i], lineNum1: i + 1, lineNum2: j + 1 });
      i++;
      j++;
      k++;
    } else if (j < lines2.length && (k >= lcs.length || lines2[j] !== lcs[k])) {
      diff.push({ type: "added", content: lines2[j], lineNum2: j + 1 });
      j++;
    } else if (i < lines1.length && (k >= lcs.length || lines1[i] !== lcs[k])) {
      diff.push({ type: "removed", content: lines1[i], lineNum1: i + 1 });
      i++;
    } else {
      if (i < lines1.length) {
        diff.push({ type: "removed", content: lines1[i], lineNum1: i + 1 });
        i++;
      }
      if (j < lines2.length) {
        diff.push({ type: "added", content: lines2[j], lineNum2: j + 1 });
        j++;
      }
    }
  }

  return diff;
};

export function TextDiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const diff = useCallback((): DiffLine[] => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    return computeDiff(lines1, lines2);
  }, [text1, text2]);

  const addedCount = diff().filter((d) => d.type === "added").length;
  const removedCount = diff().filter((d) => d.type === "removed").length;

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const text = diff()
      .map((d) => {
        if (d.type === "added") return `+ ${d.content}`;
        if (d.type === "removed") return `- ${d.content}`;
        return `  ${d.content}`;
      })
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diff.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setText1("");
    setText2("");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Original Text
          </Label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste the original text here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Modified Text
          </Label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste the modified text here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {text1 && text2 && (
        <>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Differences
            </Label>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-emerald-500 flex items-center gap-1">
                <Plus className="size-3" /> {addedCount} added
              </span>
              <span className="text-red-500 flex items-center gap-1">
                <Minus className="size-3" /> {removedCount} removed
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto font-mono text-sm">
              {diff().map((line, i) => (
                <div
                  key={i}
                  className={`flex ${
                    line.type === "added"
                      ? "bg-emerald-500/20"
                      : line.type === "removed"
                        ? "bg-red-500/20"
                        : ""
                  }`}
                >
                  <span className="w-12 shrink-0 px-2 py-1 text-right text-muted-foreground border-r border-border">
                    {line.lineNum1 || ""}
                  </span>
                  <span className="w-12 shrink-0 px-2 py-1 text-right text-muted-foreground border-r border-border">
                    {line.lineNum2 || ""}
                  </span>
                  <span className="w-6 shrink-0 px-1 py-1 text-center">
                    {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                  </span>
                  <span className="px-2 py-1 whitespace-pre-wrap break-all">{line.content}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        {text1 && text2 && (
          <>
            <Button
              onClick={() =>
                handleCopy(
                  diff()
                    .map((d) => d.content)
                    .join("\n"),
                )
              }
              variant="outline"
              size="sm"
            >
              {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
              {copied ? "Copied!" : "Copy Diff"}
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
