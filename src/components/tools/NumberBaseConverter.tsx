import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BASES = [
  { name: "Binary", base: 2, chars: "01" },
  { name: "Octal", base: 8, chars: "01234567" },
  { name: "Decimal", base: 10, chars: "0123456789" },
  { name: "Hexadecimal", base: 16, chars: "0123456789ABCDEF" },
  { name: "Base32", base: 32, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567" },
  {
    name: "Base64",
    base: 64,
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  },
];

export function NumberBaseConverter() {
  const [input, setInput] = useState("255");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);

  const convert = (num: string, from: number, to: number): string => {
    try {
      const decimal = parseInt(num, from);
      if (isNaN(decimal)) return "Invalid input";

      if (to === 10) return decimal.toString();

      const chars = BASES.find((b) => b.base === to)?.chars || "";
      if (decimal === 0) return "0";

      let result = "";
      let n = decimal;
      while (n > 0) {
        result = chars[n % to] + result;
        n = Math.floor(n / to);
      }
      return result;
    } catch {
      return "Error";
    }
  };

  const output = convert(input, fromBase, toBase);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            From Base
          </Label>
          <select
            value={fromBase}
            onChange={(e) => setFromBase(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            {BASES.map(({ name, base }) => (
              <option key={base} value={base}>
                {name} ({base})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            To Base
          </Label>
          <select
            value={toBase}
            onChange={(e) => setToBase(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            {BASES.map(({ name, base }) => (
              <option key={base} value={base}>
                {name} ({base})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Number
        </Label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono text-lg"
          placeholder="Enter number..."
        />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Result</p>
        <p className="text-3xl font-mono font-bold text-primary break-all">{output}</p>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Conversions
        </p>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          {BASES.map(({ name, base }) => (
            <div key={base} className="flex justify-between">
              <span className="text-muted-foreground">{name}:</span>
              <code className="font-mono">{convert(input, fromBase, base)}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
