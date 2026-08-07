import { useState } from "react";
import { Label } from "@/components/ui/label";

const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
};

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
];

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const convert = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return 0;

    const amountInUSD = amountNum / RATES[fromCurrency];
    return amountInUSD * RATES[toCurrency];
  };

  const result = convert();

  const formatCurrency = (value: number, code: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Amount
        </Label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            From
          </Label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            To
          </Label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result > 0 && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-sm text-muted-foreground">Converted Amount</p>
          <p className="text-4xl font-bold text-primary">{formatCurrency(result, toCurrency)}</p>
          <p className="text-sm text-muted-foreground mt-2">
            1 {fromCurrency} = {(RATES[toCurrency] / RATES[fromCurrency]).toFixed(4)} {toCurrency}
          </p>
        </div>
      )}

      <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs">
        <p className="text-amber-600 dark:text-amber-400">
          <strong>Note:</strong> Exchange rates are approximate and for demonstration purposes only.
        </p>
      </div>
    </div>
  );
}
