/**
 * Color Picker Tool
 * Pick and convert colors
 */
import { Pipette } from "lucide-react";
import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

export const colorPickerTool = {
  id: "color-picker",
  slug: "color-picker",
  name: "Color Picker",
  description: "Pick colors, convert between formats (HEX, RGB, HSL), and generate color palettes.",
  icon: Pipette,
  category: "utilities" as const,
  tags: ["color", "picker", "hex", "rgb", "hsl", "palette", "design"],
  status: "ready" as const,
  runtime: function ColorPickerComponent() {
    const [color, setColor] = useState("#3B82F6");
    const [copied, setCopied] = useState("");

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const rgb = hexToRgb(color);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    const copyToClipboard = useCallback(async (value: string, key: string) => {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    }, []);

    const formats = [
      { key: "hex", label: "HEX", value: color.toUpperCase() },
      { key: "rgb", label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "" },
      { key: "hsl", label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "" },
      { key: "rgba", label: "RGBA", value: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : "" },
    ];

    return (
      <div className="space-y-6">
        <div className="flex gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Pick a Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-24 h-24 rounded-xl cursor-pointer border-2 border-border"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Preview</label>
            <div
              className="h-24 rounded-xl border-2 border-border"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {formats.map((format) => (
            <div key={format.key} className="flex items-center gap-3">
              <span className="w-12 text-sm font-medium text-muted-foreground">{format.label}</span>
              <code className="flex-1 px-3 py-2 bg-muted/50 rounded-lg font-mono text-sm">
                {format.value}
              </code>
              <button
                onClick={() => copyToClipboard(format.value, format.key)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {copied === format.key ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4 text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Enter HEX Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border bg-background font-mono"
            placeholder="#3B82F6"
          />
        </div>
      </div>
    );
  },
};

export default colorPickerTool;
