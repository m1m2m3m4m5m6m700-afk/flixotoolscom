import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function DuplicateLinesRemover() {
  const [input, setInput] = useState("apple\nbanana\napple\norange\nbanana\ngrape\napple");
  const [copied, setCopied] = useState(false);

  const removeDuplicates = (text: string, preserveOrder: boolean = true): string[] => {
    const lines = text.split("\n").filter((l) => l.trim());
    if (preserveOrder) {
      return [...new Set(lines)];
    }
    const seen = new Set<string>();
    return lines.filter((line) => {
      const lower = line.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
  };

  const [preserveCase, setPreserveCase] = useState(true);
  const [preserveOrder, setPreserveOrder] = useState(true);

  const uniqueLines = removeDuplicates(input, preserveOrder);
  const removed = input.split("\n").filter((l) => l.trim()).length - uniqueLines.length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(uniqueLines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3"
          placeholder="Enter lines with duplicates..."
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setPreserveOrder(true)}
          className={`flex-1 rounded-lg border p-2 text-xs font-medium transition-colors ${
            preserveOrder ? "bg-primary text-primary-foreground" : "border-border"
          }`}
        >
          Keep First
        </button>
        <button
          onClick={() => setPreserveOrder(false)}
          className={`flex-1 rounded-lg border p-2 text-xs font-medium transition-colors ${
            !preserveOrder ? "bg-primary text-primary-foreground" : "border-border"
          }`}
        >
          Case-Insensitive
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Result ({uniqueLines.length} lines)
          </Label>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <textarea
          value={uniqueLines.join("\n")}
          readOnly
          className="min-h-[120px] w-full rounded-xl border border-primary/30 bg-primary/5 p-3"
        />
      </div>

      {removed > 0 && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-center">
          <span className="text-emerald-600 font-semibold">
            {removed} duplicate{removed > 1 ? "s" : ""} removed
          </span>
        </div>
      )}
    </div>
  );
}
