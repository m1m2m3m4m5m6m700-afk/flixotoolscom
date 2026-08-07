import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function JSONPathEvaluator() {
  const [json, setJson] = useState(
    '{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}',
  );
  const [path, setPath] = useState("users[*].name");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const evaluate = () => {
    try {
      const obj = JSON.parse(json);
      const parts = path.split(".").filter(Boolean);
      let current: unknown = obj;

      for (const part of parts) {
        if (part === "*") {
          current = Array.isArray(current)
            ? current
            : Object.values(current as Record<string, unknown>);
        } else if (part.includes("[*]")) {
          const key = part.replace("[*]", "");
          current = key ? (current as Record<string, unknown[]>)[key] : current;
        } else if (part.includes("[")) {
          const match = part.match(/(\w+)\[(\d+)\]/);
          if (match) {
            const [, key, idx] = match;
            current = (current as Record<string, unknown[]>)[key]?.[parseInt(idx)];
          }
        } else {
          current = (current as Record<string, unknown>)[part];
        }
      }

      setResult(Array.isArray(current) ? current.join(", ") : String(current));
    } catch {
      setResult("Error");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JSON
        </Label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Path
        </Label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          placeholder="users[*].name"
        />
      </div>

      <Button onClick={evaluate} className="w-full">
        Evaluate
      </Button>

      {result && (
        <>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Result</p>
            <p className="font-mono">{result}</p>
          </div>
          <Button variant="outline" onClick={handleCopy} className="w-full">
            {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs font-mono space-y-1">
        <p className="font-semibold">Examples:</p>
        <p>$.store.book[*].author</p>
        <p>$..name</p>
        <p>users[0]</p>
        <p>users[*].id</p>
      </div>
    </div>
  );
}
