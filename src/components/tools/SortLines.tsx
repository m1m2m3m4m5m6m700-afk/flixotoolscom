"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileText, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type SortOrder = "asc" | "desc";
type SortType = "text" | "number" | "length";

export function SortLinesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [order, setOrder] = useState<SortOrder>("asc");
  const [type, setType] = useState<SortType>("text");

  const handleSort = useCallback(() => {
    const lines = input.split("\n").filter((l) => l.trim() !== "");

    let sorted: string[];
    switch (type) {
      case "number":
        sorted = lines.sort((a, b) => {
          const numA = parseFloat(a.trim());
          const numB = parseFloat(b.trim());
          return order === "asc" ? numA - numB : numB - numA;
        });
        break;
      case "length":
        sorted = lines.sort((a, b) => {
          return order === "asc" ? a.length - b.length : b.length - a.length;
        });
        break;
      default:
        sorted = lines.sort((a, b) => {
          return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
        });
    }

    setOutput(sorted.join("\n"));
  }, [input, order, type]);

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
    a.download = "sorted-lines.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sort Order
          </Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setOrder("asc")}
              variant={order === "asc" ? "default" : "outline"}
              size="sm"
            >
              A → Z
            </Button>
            <Button
              onClick={() => setOrder("desc")}
              variant={order === "desc" ? "default" : "outline"}
              size="sm"
            >
              Z → A
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sort By
          </Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setType("text")}
              variant={type === "text" ? "default" : "outline"}
              size="sm"
            >
              Text
            </Button>
            <Button
              onClick={() => setType("number")}
              variant={type === "number" ? "default" : "outline"}
              size="sm"
            >
              Number
            </Button>
            <Button
              onClick={() => setType("length")}
              variant={type === "length" ? "default" : "outline"}
              size="sm"
            >
              Length
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input Lines
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter lines to sort (one per line)..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Sorted Output
          </Label>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <ArrowUpDown className="size-8 mb-2 opacity-40" />
                <span>Sorted lines will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleSort} disabled={!input} size="sm">
          Sort Lines
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
