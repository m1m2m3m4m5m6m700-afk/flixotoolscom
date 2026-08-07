"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ReverseMode = "characters" | "words" | "lines";

export function ReverseTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mode, setMode] = useState<ReverseMode>("characters");

  const handleReverse = useCallback(() => {
    let result = "";
    switch (mode) {
      case "characters":
        result = input.split("").reverse().join("");
        break;
      case "words":
        result = input.split(/\s+/).reverse().join(" ");
        break;
      case "lines":
        result = input.split("\n").reverse().join("\n");
        break;
    }
    setOutput(result);
  }, [input, mode]);

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
    a.download = "reverse-text-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Reverse Mode
        </Label>
        <div className="flex flex-wrap gap-2">
          {(["characters", "words", "lines"] as ReverseMode[]).map((m) => (
            <Button
              key={m}
              onClick={() => setMode(m)}
              variant={mode === m ? "default" : "outline"}
              size="sm"
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Button>
          ))}
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
            placeholder="Enter your text here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Reversed Output
          </Label>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="size-8 mb-2 opacity-40" />
                <span>Reversed text will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleReverse} disabled={!input} size="sm">
          Reverse Text
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
