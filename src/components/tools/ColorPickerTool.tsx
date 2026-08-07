"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Palette, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ColorPickerTool() {
  const [color, setColor] = useState("#3B82F6");
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([color]);

  const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHSL = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRGB = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const rgb = hexToRGB(color);
  const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (!history.includes(newColor)) {
      setHistory((prev) => [newColor, ...prev.slice(0, 19)]);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Pick a Color
            </Label>
            <div
              className="w-full h-32 rounded-xl border border-border"
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-12 cursor-pointer rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="hex"
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              HEX
            </Label>
            <div className="flex gap-2">
              <input
                id="hex"
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 font-mono"
              />
              <Button onClick={() => copyToClipboard(color)} variant="outline" size="icon">
                {copied === color ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">RGB</span>
                <Button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  variant="ghost"
                  size="sm"
                >
                  {copied === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </Button>
              </div>
              <code className="text-lg font-mono">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </code>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">HSL</span>
                <Button
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                  variant="ghost"
                  size="sm"
                >
                  {copied === `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </Button>
              </div>
              <code className="text-lg font-mono">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </code>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">CSS Variable</span>
                <Button
                  onClick={() => copyToClipboard(`#${color.slice(1).toUpperCase()}`)}
                  variant="ghost"
                  size="sm"
                >
                  {copied === `#${color.slice(1).toUpperCase()}` ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </Button>
              </div>
              <code className="text-lg font-mono">#{color.slice(1).toUpperCase()}</code>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Palette className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Click any value to copy</span>
          </div>
        </div>
      </div>

      {history.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <History className="size-4 text-muted-foreground" />
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Colors
            </Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.slice(1).map((c, i) => (
              <button
                key={i}
                onClick={() => handleColorChange(c)}
                className="w-8 h-8 rounded-lg border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
