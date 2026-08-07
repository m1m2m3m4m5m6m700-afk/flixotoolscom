"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileText, Search, Replace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function FindReplaceTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const handleReplace = useCallback(() => {
    if (!find || !input) {
      setOutput(input);
      return;
    }

    let result = input;
    try {
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(find, flags);
        result = input.replace(regex, replace);
      } else {
        if (caseSensitive) {
          result = input.split(find).join(replace);
        } else {
          const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
          result = input.replace(regex, replace);
        }
      }
    } catch (e) {
      // Invalid regex, do nothing
    }
    setOutput(result);
  }, [input, find, replace, caseSensitive, useRegex]);

  const countMatches = useCallback(() => {
    if (!find || !input) return 0;
    try {
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(find, flags);
        return (input.match(regex) || []).length;
      } else {
        if (caseSensitive) {
          return (input.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || [])
            .length;
        }
        const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
        return (input.match(regex) || []).length;
      }
    } catch {
      return 0;
    }
  }, [input, find, caseSensitive, useRegex]);

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
    a.download = "replaced-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setFind("");
    setReplace("");
  };

  const matchCount = countMatches();

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Find
            </Label>
            {matchCount > 0 && (
              <span className="text-xs text-primary flex items-center gap-1">
                <Search className="size-3" />
                {matchCount} matches found
              </span>
            )}
          </div>
          <input
            type="text"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="Text to find..."
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="text"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder="Replace with..."
            className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-xs">Case sensitive</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-xs">Use Regex</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Original Text
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full min-h-[150px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Result
        </Label>
        <div className="min-h-[150px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
          {output || (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <Replace className="size-8 mb-2 opacity-40" />
              <span>Replaced text will appear here</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleReplace} disabled={!input || !find} size="sm">
          <Replace className="size-4 mr-2" />
          Replace All
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
