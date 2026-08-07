import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const PRESET_RATES = [
  { country: "UK", rate: 20 },
  { country: "Germany", rate: 19 },
  { country: "France", rate: 20 },
  { country: "Italy", rate: 22 },
  { country: "Spain", rate: 21 },
  { country: "Netherlands", rate: 21 },
];

export function VATCalculator() {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState([20]);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const calculate = () => {
    if (mode === "add") {
      return {
        vat: (amount * rate[0]) / 100,
        total: amount + (amount * rate[0]) / 100,
      };
    }
    return {
      vat: amount - amount / (1 + rate[0] / 100),
      total: amount,
      net: amount / (1 + rate[0] / 100),
    };
  };

  const result = calculate();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("add")}
          className={`flex-1 rounded-lg p-3 text-sm font-medium ${
            mode === "add" ? "bg-primary text-primary-foreground" : "bg-surface/40"
          }`}
        >
          Add VAT
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`flex-1 rounded-lg p-3 text-sm font-medium ${
            mode === "remove" ? "bg-primary text-primary-foreground" : "bg-surface/40"
          }`}
        >
          Remove VAT
        </button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "add" ? "Net Amount" : "Gross Amount"}
        </Label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            VAT Rate
          </Label>
          <span className="text-sm font-medium">{rate[0]}%</span>
        </div>
        <Slider value={rate} onValueChange={setRate} min={0} max={30} step={0.5} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PRESET_RATES.map(({ country, rate: presetRate }) => (
          <button
            key={country}
            onClick={() => setRate([presetRate])}
            className={`rounded-lg border p-2 text-xs ${
              rate[0] === presetRate
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface/40"
            }`}
          >
            {country} ({presetRate}%)
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === "add" ? "VAT Amount" : "VAT (extracted)"}
        </p>
        <p className="text-2xl font-bold text-primary">{formatCurrency(result.vat)}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Net Amount</p>
          <p className="text-lg font-bold">
            {formatCurrency(mode === "remove" ? result.net || 0 : amount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Gross Amount</p>
          <p className="text-lg font-bold">{formatCurrency(result.total)}</p>
        </div>
      </div>
    </div>
  );
}
