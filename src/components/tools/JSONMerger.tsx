import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Plus } from "lucide-react";

export function JSONMerger() {
  const [jsons, setJsons] = useState([
    '{"users": [{"name": "Alice", "age": 30}]}',
    '{"users": [{"name": "Bob", "age": 25}]}',
  ]);
  const [merged, setMerged] = useState("");
  const [copied, setCopied] = useState(false);

  const updateJson = (index: number, value: string) => {
    const newJsons = [...jsons];
    newJsons[index] = value;
    setJsons(newJsons);
  };

  const addJson = () => {
    setJsons([...jsons, "{}"]);
  };

  const removeJson = (index: number) => {
    if (jsons.length > 1) {
      setJsons(jsons.filter((_, i) => i !== index));
    }
  };

  const merge = () => {
    try {
      const objects = jsons.map((j) => JSON.parse(j));
      const merged = objects.reduce(
        (acc, obj) => {
          Object.keys(obj).forEach((key) => {
            if (Array.isArray(acc[key]) && Array.isArray(obj[key])) {
              acc[key] = [...acc[key], ...obj[key]];
            } else if (typeof acc[key] === "object" && typeof obj[key] === "object") {
              acc[key] = { ...acc[key], ...obj[key] };
            } else {
              acc[key] = obj[key];
            }
          });
          return acc;
        },
        {} as Record<string, unknown>,
      );
      setMerged(JSON.stringify(merged, null, 2));
    } catch (e) {
      setMerged("Error: Invalid JSON");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(merged);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-3">
        {jsons.map((json, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                JSON {i + 1}
              </Label>
              {jsons.length > 1 && (
                <button
                  onClick={() => removeJson(i)}
                  className="text-xs text-destructive hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <textarea
              value={json}
              onChange={(e) => updateJson(i, e.target.value)}
              className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm min-h-[80px]"
            />
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addJson} className="w-full">
        <Plus className="size-4 mr-2" />
        Add JSON
      </Button>

      <Button onClick={merge} className="w-full">
        Merge JSON
      </Button>

      {merged && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Merged Result
              </Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <textarea
              value={merged}
              readOnly
              className="w-full rounded-xl border border-primary/30 bg-primary/5 p-3 font-mono text-sm min-h-[150px]"
            />
          </div>
        </>
      )}
    </div>
  );
}
