import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download } from "lucide-react";

export function JSONToCSVConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      setError("");
      const data = JSON.parse(jsonInput);
      if (!Array.isArray(data)) {
        throw new Error("JSON must be an array");
      }
      if (data.length === 0) {
        setCsvOutput("");
        return;
      }

      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((header) => {
              const value = row[header];
              if (value === null || value === undefined) return "";
              if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return String(value);
            })
            .join(","),
        ),
      ];

      setCsvOutput(csvRows.join("\n"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setCsvOutput("");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JSON Input (array of objects)
        </Label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
        />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button onClick={convert} disabled={!jsonInput.trim()} className="w-full">
        Convert to CSV
      </Button>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          CSV Output
        </Label>
        <div className="min-h-[150px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm whitespace-pre-wrap">
          {csvOutput || <span className="text-muted-foreground">CSV output will appear here</span>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleCopy} disabled={!csvOutput} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="outline" onClick={handleDownload} disabled={!csvOutput} className="flex-1">
          <Download className="size-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}
