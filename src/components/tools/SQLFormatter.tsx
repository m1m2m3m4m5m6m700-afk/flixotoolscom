import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

const KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "NOT",
  "IN",
  "IS",
  "NULL",
  "INSERT",
  "INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "CREATE",
  "TABLE",
  "ALTER",
  "DROP",
  "INDEX",
  "JOIN",
  "LEFT",
  "RIGHT",
  "INNER",
  "OUTER",
  "ON",
  "AS",
  "ORDER",
  "BY",
  "ASC",
  "DESC",
  "GROUP",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "UNION",
  "ALL",
  "DISTINCT",
  "COUNT",
  "SUM",
  "AVG",
  "MAX",
  "MIN",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "EXISTS",
  "BETWEEN",
  "LIKE",
];

function formatSQL(sql: string): string {
  let formatted = sql
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s*,\s*/g, ",\n  ")
    .replace(/\s*(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|OFFSET)\s*/gi, "\n$1 ");

  KEYWORDS.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    formatted = formatted.replace(regex, keyword);
  });

  return formatted.trim();
}

export function SQLFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    setOutput(formatSQL(input));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          SQL Input
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="SELECT id, name FROM users WHERE active = 1 ORDER BY created_at DESC"
        />
      </div>

      <Button onClick={format} disabled={!input.trim()} className="w-full">
        Format SQL
      </Button>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Formatted Output
        </Label>
        <div className="min-h-[120px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm whitespace-pre-wrap overflow-auto">
          {output || <span className="text-muted-foreground">Formatted SQL will appear here</span>}
        </div>
      </div>

      <Button variant="outline" onClick={handleCopy} disabled={!output} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
