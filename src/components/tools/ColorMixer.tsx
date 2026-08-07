import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function ColorMixer() {
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#8B5CF6");
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const mixColors = (c1: string, c2: string, ratio: number = 0.5) => {
    const rgb1 = hexToRgb(c1);
    const rgb2 = hexToRgb(c2);
    return rgbToHex(
      rgb1.r * (1 - ratio) + rgb2.r * ratio,
      rgb1.g * (1 - ratio) + rgb2.g * ratio,
      rgb1.b * (1 - ratio) + rgb2.b * ratio,
    );
  };

  const blendedColor = mixColors(color1, color2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(blendedColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Color 1
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="size-12 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background p-2 font-mono text-sm uppercase"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Color 2
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="size-12 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background p-2 font-mono text-sm uppercase"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Result
          </label>
          <div
            className="h-14 rounded-lg border border-border"
            style={{ backgroundColor: blendedColor }}
          />
        </div>
      </div>

      <div
        className="h-20 rounded-xl border border-border"
        style={{
          background: `linear-gradient(90deg, ${color1} 0%, ${blendedColor} 50%, ${color2} 100%)`,
        }}
      />

      <Button variant="outline" onClick={handleCopy} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy Result"}
      </Button>
    </div>
  );
}
