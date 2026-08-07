import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Upload } from "lucide-react";

export function CSVViewer() {
  const [csv, setCsv] = useState(
    "Name,Age,City\nAlice,30,New York\nBob,25,Los Angeles\nCharlie,35,Chicago",
  );
  const [delimiter, setDelimiter] = useState(",");

  const parsed = useMemo(() => {
    const lines = csv.split("\n").filter((l) => l.trim());
    return lines.map((line) => line.split(delimiter));
  }, [csv, delimiter]);

  const headers = parsed[0] || [];
  const rows = parsed.slice(1);

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsv((event.target?.result as string) || "");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          CSV Data
        </Label>
        <div className="flex gap-2">
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-lg border border-border bg-background px-2 py-1 text-sm"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
          </select>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="rounded-lg border border-border p-2 cursor-pointer hover:bg-muted"
          >
            <Upload className="size-4" />
          </label>
          <button
            onClick={downloadCSV}
            className="rounded-lg border border-border p-2 hover:bg-muted"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>

      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
        placeholder="Paste CSV data here..."
      />

      {headers.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  {headers.map((header, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {parsed.length > 0 && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-1">
          <p>
            <strong>Rows:</strong> {rows.length}
          </p>
          <p>
            <strong>Columns:</strong> {headers.length}
          </p>
        </div>
      )}
    </div>
  );
}
