import { useState } from "react";
import { Label } from "@/components/ui/label";

function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return "Invalid (1-3999)";
  const romanNumerals: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number {
  const romanValues: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanValues[roman[i].toUpperCase()];
    const next = romanValues[roman[i + 1]] || 0;
    if (current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

export function RomanNumeralConverter() {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");

  const handleNumberChange = (value: string) => {
    setNumber(value);
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setRoman(toRoman(num));
    } else {
      setRoman("");
    }
  };

  const handleRomanChange = (value: string) => {
    setRoman(value);
    const result = fromRoman(value);
    if (result > 0) {
      setNumber(result.toString());
    } else {
      setNumber("");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Number (1-3999)
        </Label>
        <input
          type="number"
          min="1"
          max="3999"
          value={number}
          onChange={(e) => handleNumberChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
          placeholder="Enter a number..."
        />
      </div>

      <div className="flex items-center justify-center text-4xl text-primary">↔</div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Roman Numeral
        </Label>
        <input
          type="text"
          value={roman}
          onChange={(e) => handleRomanChange(e.target.value.toUpperCase())}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium uppercase"
          placeholder="Enter a Roman numeral..."
        />
      </div>

      {number && roman && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-3xl font-bold">{roman}</p>
          <p className="text-sm text-muted-foreground">= {number}</p>
        </div>
      )}
    </div>
  );
}
