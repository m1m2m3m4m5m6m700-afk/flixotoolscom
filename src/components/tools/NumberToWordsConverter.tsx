import { useState } from "react";
import { Label } from "@/components/ui/label";

const UNITS = [
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

const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function numberToWords(num: number): string {
  if (num === 0) return "zero";

  const convert = (n: number): string => {
    if (n < 20) return UNITS[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + UNITS[n % 10] : "");
    if (n < 1000)
      return UNITS[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 1000000)
      return (
        convert(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + convert(n % 1000) : "")
      );
    if (n < 1000000000)
      return (
        convert(Math.floor(n / 1000000)) +
        " million" +
        (n % 1000000 ? " " + convert(n % 1000000) : "")
      );
    return (
      convert(Math.floor(n / 1000000000)) +
      " billion" +
      (n % 1000000000 ? " " + convert(n % 1000000000) : "")
    );
  };

  return convert(num);
}

export function NumberToWordsConverter() {
  const [number, setNumber] = useState("");
  const [currency, setCurrency] = useState("USD");

  const num = parseInt(number, 10);
  const words = !isNaN(num) && num >= 0 && num <= 9999999999 ? numberToWords(num) : "";

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Number
        </Label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
          placeholder="1234567890"
          min="0"
          max="9999999999"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Currency
        </Label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3"
        >
          <option value="USD">US Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
          <option value="GBP">British Pound (£)</option>
          <option value="INR">Indian Rupee (₹)</option>
        </select>
      </div>

      {words && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase mb-2">
            {currency === "USD"
              ? "US Dollar"
              : currency === "EUR"
                ? "Euro"
                : currency === "GBP"
                  ? "British Pounds"
                  : "Indian Rupees"}
          </p>
          <p className="text-lg font-medium capitalize">{words}</p>
          {currency !== "USD" && (
            <p className="text-sm text-muted-foreground mt-2 capitalize">({words} dollars)</p>
          )}
        </div>
      )}
    </div>
  );
}
