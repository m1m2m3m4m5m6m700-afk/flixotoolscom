import { useState } from "react";
import { Label } from "@/components/ui/label";

export function InterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");
  const [compoundFrequency, setCompoundFrequency] = useState(12);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100 || 0;
    const t = parseFloat(years) || 0;
    const n = compoundFrequency;

    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    return { amount, interest, totalInterest: interest };
  };

  const result = calculate();

  const schedule = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100 || 0;
    const t = parseFloat(years) || 0;
    const n = compoundFrequency;
    const rows: { year: number; amount: number; interest: number }[] = [];

    for (let i = 1; i <= Math.min(t, 10); i++) {
      const amount = p * Math.pow(1 + r / n, n * i);
      const interest = amount - p;
      rows.push({ year: i, amount, interest });
    }
    return rows;
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Principal ($)
          </Label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Interest Rate (%)
          </Label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Time (Years)
          </Label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Compound
          </Label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(parseInt(e.target.value))}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            <option value={1}>Annually</option>
            <option value={2}>Semi-annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Amount</p>
          <p className="text-3xl font-bold text-primary mt-1">
            $
            {result.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Interest Earned</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            $
            {result.totalInterest.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-muted p-3 font-semibold text-sm">Yearly Breakdown</div>
        <div className="max-h-[200px] overflow-y-auto">
          {schedule().map(({ year, amount, interest }) => (
            <div key={year} className="flex justify-between p-3 border-t border-border text-sm">
              <span>Year {year}</span>
              <span className="font-mono">${amount.toFixed(2)}</span>
              <span className="font-mono text-emerald-600">+${interest.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
