"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function MarkdownTableGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const generateTable = useCallback(() => {
    const headers = Array.from({ length: cols }, (_, i) => `Column ${i + 1}`);
    const separator = headers.map(() => "---");

    const dataRows = Array.from({ length: rows }, (_, rowIdx) =>
      Array.from({ length: cols }, (_, colIdx) => `Row ${rowIdx + 1}, Col ${colIdx + 1}`),
    );

    const toRow = (arr: string[]) => `| ${arr.join(" | ")} |`;

    const table = [toRow(headers), toRow(separator), ...dataRows.map(toRow)].join("\n");

    setOutput(table);
  }, [rows, cols]);

  const parseCSV = useCallback(() => {
    const lines = input.split("\n").filter((l) => l.trim());
    if (lines.length < 2) return;

    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;

      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseLine(lines[0]);
    const separator = headers.map(() => "---");
    const dataRows = lines.slice(1).map(parseLine);

    const toRow = (arr: string[]) => `| ${arr.join(" | ")} |`;

    const table = [toRow(headers), toRow(separator), ...dataRows.map(toRow)].join("\n");

    setOutput(table);
  }, [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setRows(3);
    setCols(3);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Generate Empty Table
            </Label>
            <div className="flex gap-4">
              <div className="space-y-1">
                <Label htmlFor="rows" className="text-xs text-muted-foreground">
                  Rows
                </Label>
                <input
                  id="rows"
                  type="number"
                  min="1"
                  max="20"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="w-20 rounded-lg border border-border bg-background px-3 py-2"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cols" className="text-xs text-muted-foreground">
                  Columns
                </Label>
                <input
                  id="cols"
                  type="number"
                  min="1"
                  max="10"
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                  className="w-20 rounded-lg border border-border bg-background px-3 py-2"
                />
              </div>
            </div>
            <Button onClick={generateTable} size="sm">
              Generate Table
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Or Import from CSV
            </Label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Name, Age, City&#10;John, 25, NYC&#10;Jane, 30, LA"
              className="w-full min-h-[150px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button onClick={parseCSV} disabled={!input} size="sm">
              Parse CSV
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Markdown Output
          </Label>
          <div className="min-h-[300px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Table className="size-8 mb-2 opacity-40" />
                <span>Markdown table will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
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
