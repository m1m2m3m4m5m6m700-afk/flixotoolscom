"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function Base64DecodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decode = useCallback(() => {
    setError(null);
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch {
      setError("Invalid Base64 string");
      setOutput("");
    }
  }, [input]);

  const encode = useCallback(() => {
    setError(null);
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch {
      setError("Invalid UTF-8 string");
      setOutput("");
    }
  }, [input]);

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
    a.download = "decoded.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Base64 or plain text here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Output
          </Label>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || error || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Lock className="size-8 mb-2 opacity-40" />
                <span>Decoded result will appear here</span>
              </div>
            )}
          </div>
          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={decode} disabled={!input} size="sm">
          Decode Base64
        </Button>
        <Button onClick={encode} disabled={!input} size="sm">
          Encode to Base64
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
