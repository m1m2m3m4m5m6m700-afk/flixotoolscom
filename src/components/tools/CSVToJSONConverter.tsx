import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download } from "lucide-react";

export function CSVToJSONConverter() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      setError("");
      const lines = csvInput.trim().split("\n");
      if (lines.length < 2) {
        throw new Error("CSV must have at least a header row and one data row");
      }

      const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || "";
        });
        return obj;
      });

      setJsonOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid CSV");
      setJsonOutput("");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          CSV Input (first row = headers)
        </Label>
        <textarea
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="name,age,city
John,30,NYC
Jane,25,LA"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button onClick={convert} disabled={!csvInput.trim()} className="w-full">
        Convert to JSON
      </Button>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JSON Output
        </Label>
        <div className="min-h-[150px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm overflow-auto">
          {jsonOutput || (
            <span className="text-muted-foreground">JSON output will appear here</span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleCopy} disabled={!jsonOutput} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={!jsonOutput}
          className="flex-1"
        >
          <Download className="size-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}
