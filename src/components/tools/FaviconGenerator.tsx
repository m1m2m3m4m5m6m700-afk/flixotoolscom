import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

export function FaviconGenerator() {
  const [text, setText] = useState("FX");
  const [bgColor, setBgColor] = useState(COLORS[0]);
  const [fgColor, setFgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(32);

  const createSvg = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="8" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${fgColor}" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold">${text.slice(0, 3)}</text>
</svg>`;
  };

  const downloadSvg = () => {
    const svg = createSvg();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadIco = () => {
    const sizes = [16, 32, 48];
    const svg = createSvg();
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 32, 32);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "favicon.ico";
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    };
    img.src = "data:image/svg+xml," + encodeURIComponent(svg);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Text (1-3 chars)
        </Label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 3))}
          className="w-full rounded-xl border border-border bg-background p-3 text-center text-xl font-bold uppercase"
          placeholder="FX"
          maxLength={3}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Background Color
        </Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setBgColor(color)}
              className={`size-10 rounded-lg border-2 transition-transform hover:scale-110 ${
                bgColor === color ? "border-primary scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="size-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Text Color
        </Label>
        <input
          type="color"
          value={fgColor}
          onChange={(e) => setFgColor(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Size: {size}px
        </Label>
        <input
          type="range"
          min="16"
          max="64"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-8">
        <div
          className="rounded-xl shadow-lg flex items-center justify-center font-bold text-white"
          style={{
            width: size * 2,
            height: size * 2,
            backgroundColor: bgColor,
            fontSize: size,
            color: fgColor,
          }}
        >
          {text.slice(0, 3)}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={downloadSvg} className="flex-1">
          <Download className="size-4 mr-2" />
          Download SVG
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">HTML to add to your site:</p>
        <code className="block bg-muted p-2 rounded text-xs break-all">
          {`<link rel="icon" type="image/svg+xml" href="/favicon.svg">`}
        </code>
      </div>
    </div>
  );
}
