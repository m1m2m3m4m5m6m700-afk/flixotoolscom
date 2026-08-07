import { useState } from "react";
import { Label } from "@/components/ui/label";

function numberToWords(num: number): string {
  if (num === 0) return "zero";

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const convertHundreds = (n: number): string => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + convertHundreds(n % 100) : "");
  };

  const convertThousands = (n: number): string => {
    if (n < 1000) return convertHundreds(n);
    return (
      convertHundreds(Math.floor(n / 1000)) +
      " thousand" +
      (n % 1000 ? " " + convertHundreds(n % 1000) : "")
    );
  };

  if (num < 0) return "minus " + numberToWords(Math.abs(num));
  if (num >= 1e12)
    return (
      numberToWords(Math.floor(num / 1e12)) +
      " trillion" +
      (num % 1e12 ? " " + numberToWords(num % 1e12) : "")
    );
  if (num >= 1e9)
    return (
      numberToWords(Math.floor(num / 1e9)) +
      " billion" +
      (num % 1e9 ? " " + numberToWords(num % 1e9) : "")
    );
  if (num >= 1e6)
    return (
      numberToWords(Math.floor(num / 1e6)) +
      " million" +
      (num % 1e6 ? " " + numberToWords(num % 1e6) : "")
    );
  return convertThousands(num);
}

export function NumberSpeller() {
  const [number, setNumber] = useState("1234567");
  const [mode, setMode] = useState<"toWords" | "toNumber">("toWords");

  const num = parseInt(number) || 0;
  const words = numberToWords(num);

  const handleModeChange = () => {
    setMode(mode === "toWords" ? "toNumber" : "toWords");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("toWords")}
          className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
            mode === "toWords"
              ? "bg-primary text-primary-foreground"
              : "border-border hover:border-primary"
          }`}
        >
          Number → Words
        </button>
        <button
          onClick={() => setMode("toNumber")}
          className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
            mode === "toNumber"
              ? "bg-primary text-primary-foreground"
              : "border-border hover:border-primary"
          }`}
        >
          Words → Number
        </button>
      </div>

      {mode === "toWords" ? (
        <>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Enter Number
            </Label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full rounded-xl border border-border bg-background p-4 text-2xl font-mono text-center"
              placeholder="Enter number..."
            />
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">In Words</p>
            <p className="text-2xl font-semibold capitalize">{words}</p>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">Word to Number conversion</p>
          <p className="text-xs mt-2">Coming soon!</p>
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">Quick Examples:</p>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>1</span>
            <span>one</span>
          </div>
          <div className="flex justify-between">
            <span>42</span>
            <span>forty-two</span>
          </div>
          <div className="flex justify-between">
            <span>1000</span>
            <span>one thousand</span>
          </div>
          <div className="flex justify-between">
            <span>1,000,000</span>
            <span>one million</span>
          </div>
        </div>
      </div>
    </div>
  );
}
