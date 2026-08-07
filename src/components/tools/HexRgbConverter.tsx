import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function HexRgbConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    if (!result) return null;
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b].map((x) => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0")).join("")
    );
  };

  const rgb = hexToRgb(hex);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            HEX
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="size-12 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-background p-3 font-mono text-sm uppercase"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </label>
          <div
            className="h-14 rounded-xl border border-border transition-colors"
            style={{ backgroundColor: hex }}
          />
        </div>
      </div>

      {rgb && (
        <div className="rounded-xl border border-border bg-muted/50 p-4 space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">RGB Values</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">R</p>
              <p className="text-xl font-mono">{rgb.r}</p>
              <button
                onClick={() => handleCopy(rgb.r.toString())}
                className="mt-1 text-xs text-muted-foreground hover:text-primary"
              >
                {copied === rgb.r.toString() ? (
                  <Check className="size-3 inline" />
                ) : (
                  <Copy className="size-3 inline" />
                )}
              </button>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">G</p>
              <p className="text-xl font-mono">{rgb.g}</p>
              <button
                onClick={() => handleCopy(rgb.g.toString())}
                className="mt-1 text-xs text-muted-foreground hover:text-primary"
              >
                {copied === rgb.g.toString() ? (
                  <Check className="size-3 inline" />
                ) : (
                  <Copy className="size-3 inline" />
                )}
              </button>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">B</p>
              <p className="text-xl font-mono">{rgb.b}</p>
              <button
                onClick={() => handleCopy(rgb.b.toString())}
                className="mt-1 text-xs text-muted-foreground hover:text-primary"
              >
                {copied === rgb.b.toString() ? (
                  <Check className="size-3 inline" />
                ) : (
                  <Copy className="size-3 inline" />
                )}
              </button>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            className="w-full"
          >
            {copied === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` ? (
              <Check className="size-4 mr-2" />
            ) : (
              <Copy className="size-4 mr-2" />
            )}
            {copied === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` ? "Copied!" : "Copy RGB String"}
          </Button>
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">CSS Variables</p>
        <code className="text-sm font-mono">background-color: {hex};</code>
      </div>
    </div>
  );
}
