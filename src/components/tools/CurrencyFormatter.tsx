import { useState } from "react";
import { Label } from "@/components/ui/label";

const CURRENCIES = [
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "EUR", symbol: "€", locale: "de-DE" },
  { code: "GBP", symbol: "£", locale: "en-GB" },
  { code: "JPY", symbol: "¥", locale: "ja-JP" },
  { code: "CNY", symbol: "¥", locale: "zh-CN" },
  { code: "INR", symbol: "₹", locale: "en-IN" },
  { code: "AUD", symbol: "A$", locale: "en-AU" },
  { code: "CAD", symbol: "C$", locale: "en-CA" },
  { code: "CHF", symbol: "Fr", locale: "de-CH" },
  { code: "BRL", symbol: "R$", locale: "pt-BR" },
];

export function CurrencyFormatter() {
  const [amount, setAmount] = useState("1000");
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  const formatCurrency = (amount: number, currency: (typeof CURRENCIES)[0]) => {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
    }).format(amount);
  };

  const num = parseFloat(amount) || 0;

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
          className="w-full rounded-xl border border-border bg-background p-4 text-2xl font-mono text-center"
          placeholder="Enter amount..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Currency
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setSelectedCurrency(curr)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                selectedCurrency.code === curr.code
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              <span className="text-xl">{curr.symbol}</span>
              <span className="block text-xs mt-1">{curr.code}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Formatted</p>
        <p className="text-4xl font-bold">{formatCurrency(num, selectedCurrency)}</p>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          All Currencies
        </p>
        <div className="grid gap-2 text-sm">
          {CURRENCIES.map((curr) => (
            <div key={curr.code} className="flex justify-between items-center">
              <span>{curr.code}</span>
              <span className="font-mono">{formatCurrency(num, curr)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
