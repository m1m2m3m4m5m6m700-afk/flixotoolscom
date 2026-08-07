"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function RemoveEmptyLinesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [includeWhitespaceOnly, setIncludeWhitespaceOnly] = useState(true);

  const handleRemove = useCallback(() => {
    const lines = input.split("\n");
    const cleaned = lines.filter((line) => {
      if (includeWhitespaceOnly) {
        return line.trim() !== "";
      }
      return line !== "";
    });
    setOutput(cleaned.join("\n"));
  }, [input, includeWhitespaceOnly]);

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
    a.download = "cleaned-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const removedCount = input.split("\n").length - output.split("\n").filter((l) => l !== "").length;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Options
        </Label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeWhitespaceOnly}
            onChange={(e) => setIncludeWhitespaceOnly(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm">Also remove lines with only whitespace</span>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input Text
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text with empty lines..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Cleaned Text
            </Label>
            {removedCount > 0 && (
              <span className="text-xs text-emerald-500 flex items-center gap-1">
                <Trash2 className="size-3" />
                {removedCount} empty lines removed
              </span>
            )}
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="size-8 mb-2 opacity-40" />
                <span>Cleaned text will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleRemove} disabled={!input} size="sm">
          Remove Empty Lines
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
