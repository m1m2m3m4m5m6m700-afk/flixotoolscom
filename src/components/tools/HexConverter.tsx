import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function HexConverter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const textToHex = (text: string) =>
    Array.from(text)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");

  const hexToText = (hex: string) => {
    try {
      return hex
        .split(/[\s,]+/)
        .map((h) => String.fromCharCode(parseInt(h, 16)))
        .join("");
    } catch {
      return "";
    }
  };

  const isHex = input.match(/^[\da-fA-F\s,]+$/);
  const output = isHex ? hexToText(input) : textToHex(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text or Hex (space-separated)
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text (e.g., Hello) or hex (e.g., 48 65 6c 6c 6f)"
        />
      </div>

      <div className="rounded-lg bg-muted/50 p-3 text-center text-sm">
        <span className="text-muted-foreground">Auto-detect: </span>
        <span className="font-medium">{isHex ? "Hex → Text" : "Text → Hex"}</span>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isHex ? "Text Output" : "Hex Output"}
        </Label>
        <div className="min-h-[120px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm break-all">
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      <Button variant="outline" onClick={handleCopy} disabled={!output} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy Output"}
      </Button>
    </div>
  );
}
