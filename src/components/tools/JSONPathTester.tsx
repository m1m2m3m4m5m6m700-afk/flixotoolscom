import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function JSONPathTester() {
  const [json, setJson] = useState(`{
  "store": {
    "book": [
      { "category": "fiction", "price": 9.99 },
      { "category": "tech", "price": 29.99 },
      { "category": "kids", "price": 14.99 }
    ],
    "bicycle": { "color": "red", "price": 19.99 }
  }
}`);
  const [path, setPath] = useState("$.store.book[*].category");
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const evaluatePath = () => {
    try {
      const obj = JSON.parse(json);
      const pathExpr = path
        .replace(/\$\./g, "")
        .split(".")
        .reduce((acc: unknown, part) => {
          if (part === "*" && Array.isArray(acc)) {
            return acc;
          }
          if (part.includes("[*]")) {
            const key = part.replace("[*]", "");
            return key ? (acc as Record<string, unknown>)[key] : acc;
          }
          if (part.includes("[")) {
            const [key, idx] = part.match(/(\w+)\[(\d+)\]/)?.slice(1) || [];
            return idx ? (acc as unknown[])[parseInt(idx)] : (acc as Record<string, unknown>)[key];
          }
          return part ? (acc as Record<string, unknown>)[part] : acc;
        }, obj);

      if (Array.isArray(pathExpr)) {
        setResult(pathExpr.map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v))));
      } else if (pathExpr !== undefined) {
        setResult([typeof pathExpr === "object" ? JSON.stringify(pathExpr) : String(pathExpr)]);
      } else {
        setResult([]);
      }
      setError("");
    } catch (e) {
      setError("Invalid JSON or path");
      setResult([]);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JSON Input
        </Label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="min-h-[200px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JSONPath Expression
        </Label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          placeholder="$.store.book[*].price"
        />
      </div>

      <Button onClick={evaluatePath} className="w-full">
        Evaluate Path
      </Button>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result.length > 0 && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Results ({result.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 font-mono text-sm max-h-[200px] overflow-auto">
              {result.map((r, i) => (
                <div key={i} className="p-2 border-b border-border last:border-0">
                  {r}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">Common Patterns:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground font-mono text-xs">
          <li>$.store.book[*].price - All book prices</li>
          <li>$..book[0] - First book</li>
          <li>$..book[?(@.price&gt;10)] - Books over $10</li>
          <li>$.store.* - All store properties</li>
        </ul>
      </div>
    </div>
  );
}
