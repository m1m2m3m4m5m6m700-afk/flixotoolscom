import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";

export function RandomHexGenerator() {
  const [hex, setHex] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(6);

  const generate = () => {
    let result = "#";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 16).toString(16);
    }
    setHex(result.toUpperCase());
  };

  const generateBatch = (count: number): string[] => {
    return Array.from({ length: count }, () => {
      let result = "#";
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 16).toString(16);
      }
      return result.toUpperCase();
    });
  };

  const [batch, setBatch] = useState<string[]>([]);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBatch = async () => {
    await navigator.clipboard.writeText(batch.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Length (hex chars)
          </label>
          <span className="text-sm font-mono">{length}</span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate
      </Button>

      {hex && (
        <>
          <div className="h-32 rounded-xl border border-border" style={{ backgroundColor: hex }} />
          <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4">
            <span className="text-2xl font-mono font-bold">{hex}</span>
            <button
              onClick={() => handleCopy(hex)}
              className="rounded-lg border border-border p-2 hover:bg-muted"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </>
      )}

      <Button variant="outline" onClick={() => setBatch(generateBatch(10))} className="w-full">
        Generate 10 Colors
      </Button>

      {batch.length > 0 && (
        <>
          <div className="grid grid-cols-5 gap-2">
            {batch.map((color, i) => (
              <button
                key={i}
                onClick={() => handleCopy(color)}
                className="aspect-square rounded-lg border border-border transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <Button variant="outline" onClick={handleCopyBatch} className="w-full">
            <Copy className="size-4 mr-2" />
            Copy All
          </Button>
        </>
      )}
    </div>
  );
}
