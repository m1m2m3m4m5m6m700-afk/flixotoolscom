import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";

const BASE_PALETTES = [
  { name: "Sunset", colors: ["#FF6B6B", "#FFA07A", "#FFD93D", "#6BCB77", "#4D96FF"] },
  { name: "Ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#03045E"] },
  { name: "Forest", colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"] },
  { name: "Berry", colors: ["#590D22", "#800F2F", "#A4133C", "#C9184A", "#FF4D6D"] },
];

export function ColorPaletteGenerator() {
  const [palette, setPalette] = useState(BASE_PALETTES[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const generateRandom = () => {
    const randomPalette = {
      name: "Custom",
      colors: Array.from(
        { length: 5 },
        () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0"),
      ),
    };
    setPalette(randomPalette);
  };

  const handleCopy = async (color: string) => {
    await navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(palette.colors.join(", "));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{palette.name} Palette</h3>
        <Button variant="outline" size="sm" onClick={generateRandom}>
          <RefreshCw className="size-4 mr-2" />
          Random
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {palette.colors.map((color, i) => (
          <button
            key={i}
            onClick={() => handleCopy(color)}
            className="group relative aspect-square rounded-xl border border-border transition-transform hover:scale-105"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {copied === color ? (
                <Check className="size-5 text-white drop-shadow-lg" />
              ) : (
                <Copy className="size-5 text-white drop-shadow-lg" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Color Values</p>
        <div className="flex flex-wrap gap-2">
          {palette.colors.map((color, i) => (
            <code key={i} className="text-sm bg-muted/50 px-2 py-1 rounded font-mono uppercase">
              {color}
            </code>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={copyAll} className="w-full">
        {copied === "all" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied === "all" ? "Copied!" : "Copy All Colors"}
      </Button>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {BASE_PALETTES.map((p) => (
            <button
              key={p.name}
              onClick={() => setPalette(p)}
              className={`rounded-lg border p-1 transition-colors ${
                palette.name === p.name ? "border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex gap-0.5">
                {p.colors.map((c, i) => (
                  <div key={i} className="size-4 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
