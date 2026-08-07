import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

type GradientType = "linear" | "radial" | "conic";

export function CSSGradientGenerator() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [colors, setColors] = useState(["#3B82F6", "#8B5CF6", "#EC4899"]);
  const [copied, setCopied] = useState(false);

  const generateGradient = () => {
    switch (type) {
      case "linear":
        return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
      case "radial":
        return `radial-gradient(circle, ${colors.join(", ")})`;
      case "conic":
        return `conic-gradient(from ${angle}deg, ${colors.join(", ")})`;
      default:
        return "";
    }
  };

  const gradient = generateGradient();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(gradient);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const addColor = () => {
    if (colors.length < 8) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      setColors([...colors, randomColor]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Gradient Type
        </Label>
        <div className="flex gap-2">
          {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 rounded-lg p-2 text-sm font-medium capitalize ${
                type === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface/40 border border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {type !== "radial" && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Angle: {angle}°
          </Label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Colors
        </Label>
        <div className="space-y-2">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="size-10 rounded border border-border cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background p-2 font-mono text-sm uppercase"
              />
              {colors.length > 2 && (
                <button
                  onClick={() => removeColor(i)}
                  className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {colors.length < 8 && (
          <button
            onClick={addColor}
            className="w-full rounded-lg border border-dashed border-border p-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            + Add Color
          </button>
        )}
      </div>

      {gradient && (
        <>
          <div className="h-32 rounded-xl border border-border" style={{ background: gradient }} />

          <div className="rounded-lg bg-muted/50 p-3">
            <code className="text-sm font-mono break-all">{gradient}</code>
          </div>

          <Button variant="outline" onClick={handleCopy} className="w-full">
            {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            {copied ? "Copied!" : "Copy CSS"}
          </Button>
        </>
      )}
    </div>
  );
}
