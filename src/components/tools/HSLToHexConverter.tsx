import { useState } from "react";
import { Label } from "@/components/ui/label";

export function HSLToHexConverter() {
  const [h, setH] = useState(220);
  const [s, setS] = useState(100);
  const [l, setL] = useState(50);

  const hslToHex = (hue: number, sat: number, light: number): string => {
    sat /= 100;
    light /= 100;
    const a = sat * Math.min(light, 1 - light);
    const f = (n: number) => {
      const k = (n + hue / 30) % 12;
      const color = light - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const hex = hslToHex(h, s, l);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="h-24 rounded-xl border border-border" style={{ backgroundColor: hex }} />

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Hue: {h}°
        </Label>
        <input
          type="range"
          min="0"
          max="360"
          value={h}
          onChange={(e) => setH(parseInt(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))`,
          }}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Saturation: {s}%
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={s}
          onChange={(e) => setS(parseInt(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, hsl(${h},0%,${l}%), hsl(${h},100%,${l}%))`,
          }}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Lightness: {l}%
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={l}
          onChange={(e) => setL(parseInt(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, hsl(${h},${s}%,0%), hsl(${h},${s}%,50%), hsl(${h},${s}%,100%))`,
          }}
        />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">HEX Result</p>
        <p className="text-4xl font-mono font-bold">{hex}</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">RGB</p>
          <p className="font-mono">
            {(() => {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              return `${r}, ${g}, ${b}`;
            })()}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">HSL</p>
          <p className="font-mono">
            {h}, {s}%, {l}%
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">CSS</p>
          <p className="font-mono text-xs">
            hsl({h},{s}%,{l}%)
          </p>
        </div>
      </div>
    </div>
  );
}
