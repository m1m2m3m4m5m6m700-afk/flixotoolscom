"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const handleRemoveDuplicates = useCallback(() => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key) && line.trim() !== "") {
        seen.add(key);
        unique.push(line);
      }
    }

    setOutput(unique.join("\n"));
  }, [input, caseSensitive]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "unique-lines.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const duplicateCount =
    input.split("\n").length - output.split("\n").filter((l) => l.trim()).length;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Options
        </Label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Case sensitive</span>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input Text (with duplicates)
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text with duplicate lines..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Unique Lines
            </Label>
            {duplicateCount > 0 && (
              <span className="text-xs text-emerald-500 flex items-center gap-1">
                <Trash2 className="size-3" />
                {duplicateCount} duplicates removed
              </span>
            )}
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="size-8 mb-2 opacity-40" />
                <span>Unique lines will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleRemoveDuplicates} disabled={!input} size="sm">
          Remove Duplicates
        </Button>
        {output && (
          <>
            <Button onClick={() => handleCopy(output)} variant="outline" size="sm">
              {copied === output ? (
                <Check className="size-4 mr-2" />
              ) : (
                <Copy className="size-4 mr-2" />
              )}
              {copied === output ? "Copied!" : "Copy"}
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
