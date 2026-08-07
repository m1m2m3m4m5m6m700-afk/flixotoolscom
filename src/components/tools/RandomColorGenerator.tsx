import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

export function RandomColorGenerator() {
  const [color, setColor] = useState("#3B82F6");
  const [copied, setCopied] = useState(false);

  const generateColor = () => {
    const hex = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    setColor(`#${hex}`);
  };

  useEffect(() => {
    generateColor();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formats = [
    { label: "HEX", value: color },
    {
      label: "RGB",
      value: `rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})`,
    },
    {
      label: "HSL",
      value: (() => {
        const r = parseInt(color.slice(1, 3), 16) / 255;
        const g = parseInt(color.slice(3, 5), 16) / 255;
        const b = parseInt(color.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
          s = 0;
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
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
      })(),
    },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="h-32 rounded-xl border border-border" style={{ backgroundColor: color }} />

      <div className="flex gap-2">
        <Button onClick={generateColor} className="flex-1">
          <RefreshCw className="size-4 mr-2" />
          New Color
        </Button>
        <Button variant="outline" onClick={handleCopy} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      <div className="space-y-2">
        {formats.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-3"
          >
            <span className="text-xs font-semibold uppercase text-muted-foreground">{label}</span>
            <span className="font-mono text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
