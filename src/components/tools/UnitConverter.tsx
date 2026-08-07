import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, RotateCcw } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "data" | "time" | "speed";

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const CATEGORIES: { id: Category; name: string }[] = [
  { id: "length", name: "Length" },
  { id: "weight", name: "Weight" },
  { id: "temperature", name: "Temperature" },
  { id: "data", name: "Data Storage" },
  { id: "time", name: "Time" },
  { id: "speed", name: "Speed" },
];

const UNITS: Record<Category, UnitDef[]> = {
  length: [
    { id: "m", name: "Meter", symbol: "m", toBase: (v) => v, fromBase: (v) => v },
    {
      id: "km",
      name: "Kilometer",
      symbol: "km",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    {
      id: "cm",
      name: "Centimeter",
      symbol: "cm",
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100,
    },
    {
      id: "mm",
      name: "Millimeter",
      symbol: "mm",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    {
      id: "mi",
      name: "Mile",
      symbol: "mi",
      toBase: (v) => v * 1609.344,
      fromBase: (v) => v / 1609.344,
    },
    {
      id: "yd",
      name: "Yard",
      symbol: "yd",
      toBase: (v) => v * 0.9144,
      fromBase: (v) => v / 0.9144,
    },
    {
      id: "ft",
      name: "Foot",
      symbol: "ft",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
    {
      id: "in",
      name: "Inch",
      symbol: "in",
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254,
    },
  ],
  weight: [
    { id: "kg", name: "Kilogram", symbol: "kg", toBase: (v) => v, fromBase: (v) => v },
    { id: "g", name: "Gram", symbol: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    {
      id: "mg",
      name: "Milligram",
      symbol: "mg",
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000,
    },
    {
      id: "lb",
      name: "Pound",
      symbol: "lb",
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592,
    },
    {
      id: "oz",
      name: "Ounce",
      symbol: "oz",
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495,
    },
    {
      id: "t",
      name: "Metric Ton",
      symbol: "t",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
  ],
  temperature: [
    { id: "c", name: "Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
    {
      id: "f",
      name: "Fahrenheit",
      symbol: "°F",
      toBase: (v) => (v - 32) * (5 / 9),
      fromBase: (v) => v * (9 / 5) + 32,
    },
    {
      id: "k",
      name: "Kelvin",
      symbol: "K",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  ],
  data: [
    { id: "b", name: "Bytes", symbol: "B", toBase: (v) => v, fromBase: (v) => v },
    {
      id: "kb",
      name: "Kilobytes",
      symbol: "KB",
      toBase: (v) => v * 1024,
      fromBase: (v) => v / 1024,
    },
    {
      id: "mb",
      name: "Megabytes",
      symbol: "MB",
      toBase: (v) => v * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024),
    },
    {
      id: "gb",
      name: "Gigabytes",
      symbol: "GB",
      toBase: (v) => v * 1024 * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024 * 1024),
    },
    {
      id: "tb",
      name: "Terabytes",
      symbol: "TB",
      toBase: (v) => v * 1024 * 1024 * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024 * 1024 * 1024),
    },
    { id: "bit", name: "Bits", symbol: "bit", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
  ],
  time: [
    { id: "s", name: "Seconds", symbol: "s", toBase: (v) => v, fromBase: (v) => v },
    {
      id: "ms",
      name: "Milliseconds",
      symbol: "ms",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    { id: "min", name: "Minutes", symbol: "min", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    { id: "h", name: "Hours", symbol: "h", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { id: "d", name: "Days", symbol: "d", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    { id: "w", name: "Weeks", symbol: "w", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
  ],
  speed: [
    { id: "ms", name: "Meters/sec", symbol: "m/s", toBase: (v) => v, fromBase: (v) => v },
    {
      id: "kmh",
      name: "Kilometers/hour",
      symbol: "km/h",
      toBase: (v) => v / 3.6,
      fromBase: (v) => v * 3.6,
    },
    {
      id: "mph",
      name: "Miles/hour",
      symbol: "mph",
      toBase: (v) => v * 0.44704,
      fromBase: (v) => v / 0.44704,
    },
    {
      id: "kn",
      name: "Knots",
      symbol: "kn",
      toBase: (v) => v * 0.514444,
      fromBase: (v) => v / 0.514444,
    },
    {
      id: "fts",
      name: "Feet/sec",
      symbol: "ft/s",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
  ],
};

export function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const units = UNITS[category];

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "";

    const from = units.find((u) => u.id === fromUnit);
    const to = units.find((u) => u.id === toUnit);

    if (!from || !to) return "";

    const baseValue = from.toBase(value);
    const converted = to.fromBase(baseValue);

    return converted.toLocaleString(undefined, { maximumFractionDigits: 10 });
  }, [inputValue, fromUnit, toUnit, units]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleReset = () => {
    setInputValue("");
    setFromUnit(units[0].id);
    setToUnit(units[1]?.id || units[0].id);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Category Selector */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Category
        </Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCategory(cat.id);
                setFromUnit(UNITS[cat.id][0].id);
                setToUnit(UNITS[cat.id][1]?.id || UNITS[cat.id][0].id);
                setInputValue("");
              }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Conversion */}
      <div className="space-y-4">
        {/* From */}
        <div className="grid gap-3">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            From
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 font-mono"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 font-medium"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={handleSwap}>
            <ArrowRightLeft className="size-4" />
          </Button>
        </div>

        {/* To */}
        <div className="grid gap-3">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            To
          </Label>
          <div className="flex gap-2">
            <Input
              value={result}
              readOnly
              placeholder="Result"
              className="flex-1 font-mono bg-muted/30"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 font-medium"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && inputValue && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-3xl font-bold font-mono text-primary">
            {result} {units.find((u) => u.id === toUnit)?.symbol}
          </p>
        </div>
      )}

      {/* Reset */}
      <Button onClick={handleReset} variant="ghost" className="w-full">
        <RotateCcw className="mr-2 size-4" />
        Reset
      </Button>
    </div>
  );
}
