"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AddLineNumbersTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [startNumber, setStartNumber] = useState(1);
  const [padding, setPadding] = useState(3);
  const [separator, setSeparator] = useState<": " | ". " | ") " | "\t">(": ");

  const processText = useCallback(() => {
    const lines = input.split("\n");
    const paddedStart = String(startNumber).padStart(padding, "0");

    const numbered = lines.map((line, i) => {
      const lineNum = String(startNumber + i).padStart(padding, "0");
      return `${lineNum}${separator}${line}`;
    });

    setOutput(numbered.join("\n"));
  }, [input, startNumber, padding, separator]);

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
    a.download = "numbered-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setStartNumber(1);
    setPadding(3);
    setSeparator(": ");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <Label htmlFor="start" className="text-xs text-muted-foreground">
            Start Number
          </Label>
          <input
            id="start"
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="padding" className="text-xs text-muted-foreground">
            Padding Width
          </Label>
          <input
            id="padding"
            type="number"
            min="1"
            max="10"
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="separator" className="text-xs text-muted-foreground">
            Separator
          </Label>
          <select
            id="separator"
            value={separator}
            onChange={(e) => setSeparator(e.target.value as typeof separator)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          >
            <option value=": ">colon space</option>
            <option value=". ">dot space</option>
            <option value=") ">right paren</option>
            <option value="\t">tab</option>
          </select>
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
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Numbered Output
          </Label>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Hash className="size-8 mb-2 opacity-40" />
                <span>Numbered text will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={processText} disabled={!input} size="sm">
          Add Line Numbers
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
