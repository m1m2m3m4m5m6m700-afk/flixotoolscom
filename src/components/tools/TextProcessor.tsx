"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextProcessorProps {
  title: string;
  description: string;
  process: (text: string) => string;
  placeholder?: string;
  showStats?: boolean;
}

export function TextProcessor({
  title,
  description,
  process,
  placeholder = "Enter your text here...",
  showStats = false,
}: TextProcessorProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = process(input);
      setOutput(result);
      setIsProcessing(false);
    }, 100);
  }, [input, process]);

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
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-result.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const getStats = (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text.split("\n").length;
    return { words, chars, lines };
  };

  const inputStats = getStats(input);
  const outputStats = getStats(output);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Input Text
            </label>
            {showStats && (
              <span className="text-xs text-muted-foreground">
                {inputStats.words} words | {inputStats.chars} chars | {inputStats.lines} lines
              </span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Output
            </label>
            {showStats && output && (
              <span className="text-xs text-muted-foreground">
                {outputStats.words} words | {outputStats.chars} chars | {outputStats.lines} lines
              </span>
            )}
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="size-8 mb-2 opacity-40" />
                <span>Output will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleProcess} disabled={isProcessing || !input} size="sm">
          {isProcessing ? (
            <>
              <RefreshCw className="size-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>Run {title}</>
          )}
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
