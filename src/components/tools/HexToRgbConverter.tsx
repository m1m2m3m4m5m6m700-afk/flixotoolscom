import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function HexToRgbConverter() {
  const [hex, setHex] = useState("#FF5733");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (h: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
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
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-full h-14 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono uppercase"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </label>
          <div
            className="h-32 rounded-xl border border-border transition-colors"
            style={{ backgroundColor: hex }}
          />
        </div>
      </div>

      {rgb && (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Red", value: rgb.r, color: "text-red-500" },
            { label: "Green", value: rgb.g, color: "text-green-500" },
            { label: "Blue", value: rgb.b, color: "text-blue-500" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-muted/30 p-4 text-center"
            >
              <p className={`text-xs text-muted-foreground ${color}`}>{label}</p>
              <p className="text-2xl font-bold font-mono">{value}</p>
              <button
                onClick={() => handleCopy(value.toString())}
                className="mt-1 text-xs text-muted-foreground hover:text-primary"
              >
                {copied === value.toString() ? (
                  <Check className="size-3 inline" />
                ) : (
                  <Copy className="size-3 inline" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {rgb && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            className="flex-1"
          >
            {copied === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` ? (
              <Check className="size-4 mr-2" />
            ) : (
              <Copy className="size-4 mr-2" />
            )}
            rgb()
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCopy(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`)}
            className="flex-1"
          >
            rgba()
          </Button>
        </div>
      )}

      {rgb && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
          <p className="font-semibold">CSS Variables</p>
          <code className="block bg-muted p-2 rounded">background-color: {hex};</code>
          <code className="block bg-muted p-2 rounded">
            color: rgb({rgb.r}, {rgb.g}, {rgb.b});
          </code>
        </div>
      )}
    </div>
  );
}
