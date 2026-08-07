"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileSpreadsheet, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Mode = "format" | "sort" | "filter" | "transpose";

export function CSVFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("format");
  const [headers, setHeaders] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState(0);
  const [filterColumn, setFilterColumn] = useState(0);
  const [filterValue, setFilterValue] = useState("");

  const parseCSV = useCallback((text: string): { headers: string[]; rows: string[][] } => {
    const lines = text.split("\n").filter((l) => l.trim());
    if (lines.length === 0) return { headers: [], rows: [] };

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

    const parsedLines = lines.map(parseLine);
    return {
      headers: parsedLines[0] || [],
      rows: parsedLines.slice(1),
    };
  }, []);

  const formatCSV = useCallback(
    (text: string): string => {
      const { headers, rows } = parseCSV(text);
      if (headers.length === 0) return text;

      const maxWidths = headers.map((h, i) => {
        const maxWidth = Math.max(h.length, ...rows.map((r) => (r[i] || "").length));
        return maxWidth + 2;
      });

      const formatRow = (row: string[]): string =>
        row.map((cell, i) => cell.padEnd(maxWidths[i])).join("|");

      return [
        formatRow(headers),
        maxWidths.map((w) => "=".repeat(w)).join("+"),
        ...rows.map(formatRow),
      ].join("\n");
    },
    [parseCSV],
  );

  const sortCSV = useCallback(
    (text: string, column: number): string => {
      const { headers, rows } = parseCSV(text);
      if (rows.length === 0) return text;

      const sortedRows = [...rows].sort((a, b) => {
        const valA = a[column] || "";
        const valB = b[column] || "";
        return valA.localeCompare(valB, undefined, { numeric: true });
      });

      return [headers.join(","), ...sortedRows.map((r) => r.join(","))].join("\n");
    },
    [parseCSV],
  );

  const filterCSV = useCallback(
    (text: string, column: number, value: string): string => {
      const { headers, rows } = parseCSV(text);
      if (rows.length === 0) return text;

      const filteredRows = rows.filter((row) =>
        (row[column] || "").toLowerCase().includes(value.toLowerCase()),
      );

      return [headers.join(","), ...filteredRows.map((r) => r.join(","))].join("\n");
    },
    [parseCSV],
  );

  const transposeCSV = useCallback(
    (text: string): string => {
      const { headers, rows } = parseCSV(text);
      if (headers.length === 0) return text;

      const allRows = [headers, ...rows];
      const maxCols = Math.max(...allRows.map((r) => r.length));

      const transposed: string[][] = [];
      for (let i = 0; i < maxCols; i++) {
        transposed.push(allRows.map((row) => row[i] || ""));
      }

      return transposed.map((row) => row.join(",")).join("\n");
    },
    [parseCSV],
  );

  const handleProcess = useCallback(() => {
    try {
      let result = "";
      switch (mode) {
        case "sort":
          result = sortCSV(input, sortColumn);
          break;
        case "filter":
          result = filterCSV(input, filterColumn, filterValue);
          break;
        case "transpose":
          result = transposeCSV(input);
          break;
        default:
          result = formatCSV(input);
      }
      setOutput(result);

      // Update headers for dropdowns
      const { headers: h } = parseCSV(input);
      setHeaders(h);
    } catch (e) {
      setOutput("Error processing CSV");
    }
  }, [
    input,
    mode,
    sortColumn,
    filterColumn,
    filterValue,
    formatCSV,
    sortCSV,
    filterCSV,
    transposeCSV,
    parseCSV,
  ]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setHeaders([]);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Mode
        </Label>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setMode("format")}
            variant={mode === "format" ? "default" : "outline"}
            size="sm"
          >
            Format
          </Button>
          <Button
            onClick={() => setMode("sort")}
            variant={mode === "sort" ? "default" : "outline"}
            size="sm"
          >
            Sort
          </Button>
          <Button
            onClick={() => setMode("filter")}
            variant={mode === "filter" ? "default" : "outline"}
            size="sm"
          >
            Filter
          </Button>
          <Button
            onClick={() => setMode("transpose")}
            variant={mode === "transpose" ? "default" : "outline"}
            size="sm"
          >
            Transpose
          </Button>
        </div>
      </div>

      {(mode === "sort" || mode === "filter") && headers.length > 0 && (
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Column</Label>
            <select
              value={mode === "sort" ? sortColumn : filterColumn}
              onChange={(e) => {
                if (mode === "sort") setSortColumn(Number(e.target.value));
                else setFilterColumn(Number(e.target.value));
              }}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
            >
              {headers.map((h, i) => (
                <option key={i} value={i}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          {mode === "filter" && (
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Contains</Label>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Filter value..."
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input CSV
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV data here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Output
          </Label>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-auto whitespace-pre">
            {output || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileSpreadsheet className="size-8 mb-2 opacity-40" />
                <span>Formatted CSV will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleProcess} disabled={!input} size="sm">
          Process CSV
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
