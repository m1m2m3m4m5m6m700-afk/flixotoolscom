import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Palette } from "lucide-react";
import { trackCopyAction } from "@/lib/analytics";

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
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
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max !== min) {
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
    v: Math.round(v * 100),
  };
}

export function ColorConverter() {
  const [color, setColor] = useState("#3B82F6");
  const [values, setValues] = useState<ColorValues | null>(null);
  const [copied, setCopied] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    const rgb = hexToRgb(color);
    if (rgb) {
      setValues({
        hex: color.toUpperCase(),
        rgb,
        hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
        hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
      });
      setInputError("");
    } else {
      setInputError("Invalid color format");
    }
  }, [color]);

  const handleCopy = async (format: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      trackCopyAction("color-converter", value.length, "color-converter");
      setCopied(format);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      // Ignore
    }
  };

  const presets = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3F3F3",
    "#FF33F3",
    "#33FFF3",
    "#FFD700",
    "#FF6347",
    "#9370DB",
    "#20B2AA",
    "#FF69B4",
    "#00CED1",
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Color Picker */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pick a Color
          </Label>
          <div className="relative">
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-14 w-full cursor-pointer rounded-xl border-2 border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            HEX Value
          </Label>
          <Input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#000000"
            className="h-14 font-mono text-lg"
          />
        </div>
      </div>

      {/* Color Preview */}
      {values && (
        <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/40 p-4">
          <div
            className="h-20 w-20 rounded-xl border-2 border-border shadow-sm"
            style={{ backgroundColor: values.hex }}
          />
          <div className="flex-1 space-y-1">
            <p className="text-2xl font-bold font-mono">{values.hex}</p>
            <p className="text-sm text-muted-foreground font-mono">
              RGB({values.rgb.r}, {values.rgb.g}, {values.rgb.b})
            </p>
          </div>
        </div>
      )}

      {/* Color Values */}
      {values && (
        <div className="space-y-3">
          <ColorValueCard
            label="HEX"
            value={values.hex}
            format="hex"
            copied={copied}
            onCopy={handleCopy}
          />
          <ColorValueCard
            label="RGB"
            value={`rgb(${values.rgb.r}, ${values.rgb.g}, ${values.rgb.b})`}
            format="rgb"
            copied={copied}
            onCopy={handleCopy}
          />
          <ColorValueCard
            label="HSL"
            value={`hsl(${values.hsl.h}, ${values.hsl.s}%, ${values.hsl.l}%)`}
            format="hsl"
            copied={copied}
            onCopy={handleCopy}
          />
          <ColorValueCard
            label="HSV"
            value={`hsv(${values.hsv.h}, ${values.hsv.s}%, ${values.hsv.v}%)`}
            format="hsv"
            copied={copied}
            onCopy={handleCopy}
          />
        </div>
      )}

      {/* Presets */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Colors
        </Label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => setColor(preset)}
              className="h-8 w-8 rounded-lg border-2 border-border transition-transform hover:scale-110"
              style={{ backgroundColor: preset }}
              title={preset}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorValueCard({
  label,
  value,
  format,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  format: string;
  copied: string;
  onCopy: (format: string, value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <p className="font-mono text-sm">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onCopy(format, value)}
        className="shrink-0"
      >
        {copied === format ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </div>
  );
}
