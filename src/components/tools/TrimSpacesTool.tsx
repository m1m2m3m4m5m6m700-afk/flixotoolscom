"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Scissors, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function TrimSpacesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    leading: true,
    trailing: true,
    multiple: true,
    tabs: true,
    newlines: false,
  });

  const processText = useCallback(() => {
    let result = input;

    if (options.leading) {
      result = result.trimStart();
    }
    if (options.trailing) {
      result = result.trimEnd();
    }
    if (options.tabs) {
      result = result.replace(/\t/g, " ");
    }
    if (options.multiple) {
      result = result.replace(/  +/g, " ");
    }
    if (options.newlines) {
      result = result.replace(/\n+/g, "\n");
    }

    setOutput(result);
  }, [input, options]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trimmed-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleSample = () => {
    setInput("    Hello    World!    \n\n\n   This  is   a   test.    ");
  };

  const getStats = () => {
    if (!input || !output) return null;
    return {
      original: input.length,
      trimmed: output.length,
      removed: input.length - output.length,
    };
  };

  const stats = getStats();

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Options
          </Label>
          <Button onClick={handleSample} variant="ghost" size="sm">
            Try Sample
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.leading}
              onChange={(e) => setOptions({ ...options, leading: e.target.checked })}
              className="rounded border-border"
            />
            <span className="text-sm">Leading spaces</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.trailing}
              onChange={(e) => setOptions({ ...options, trailing: e.target.checked })}
              className="rounded border-border"
            />
            <span className="text-sm">Trailing spaces</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.multiple}
              onChange={(e) => setOptions({ ...options, multiple: e.target.checked })}
              className="rounded border-border"
            />
            <span className="text-sm">Multiple spaces</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.tabs}
              onChange={(e) => setOptions({ ...options, tabs: e.target.checked })}
              className="rounded border-border"
            />
            <span className="text-sm">Tabs to spaces</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.newlines}
              onChange={(e) => setOptions({ ...options, newlines: e.target.checked })}
              className="rounded border-border"
            />
            <span className="text-sm">Multiple newlines</span>
          </label>
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
              Trimmed Output
            </Label>
            {stats && stats.removed > 0 && (
              <span className="text-xs text-emerald-500">-{stats.removed} chars</span>
            )}
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Scissors className="size-8 mb-2 opacity-40" />
                <span>Trimmed text will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={processText} disabled={!input} size="sm">
          <Scissors className="size-4 mr-2" />
          Trim Spaces
        </Button>
        {output && (
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
