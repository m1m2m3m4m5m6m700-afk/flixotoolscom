import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function InvestmentCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState([7]);
  const [years, setYears] = useState([10]);

  const monthlyRate = rate[0] / 100 / 12;
  const months = years[0] * 12;

  const futureValue =
    principal * Math.pow(1 + monthlyRate, months) +
    monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const totalContributions = principal + monthly * months;
  const totalInterest = futureValue - totalContributions;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Initial Investment
          </Label>
          <span className="text-sm font-medium">{formatCurrency(principal)}</span>
        </div>
        <Input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="text-lg font-medium"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Monthly Contribution
          </Label>
          <span className="text-sm font-medium">{formatCurrency(monthly)}</span>
        </div>
        <Input
          type="number"
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className="text-lg font-medium"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Annual Return Rate
          </Label>
          <span className="text-sm font-medium">{rate[0]}%</span>
        </div>
        <Slider value={rate} onValueChange={setRate} min={0} max={15} step={0.5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Investment Period
          </Label>
          <span className="text-sm font-medium">{years[0]} years</span>
        </div>
        <Slider value={years} onValueChange={setYears} min={1} max={40} step={1} />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Future Value</p>
        <p className="text-4xl font-bold text-primary">{formatCurrency(Math.round(futureValue))}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Total Contributions</p>
          <p className="text-lg font-bold">{formatCurrency(totalContributions)}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="text-xs text-muted-foreground">Total Interest Earned</p>
          <p className="text-lg font-bold text-emerald-500">
            {formatCurrency(Math.round(totalInterest))}
          </p>
        </div>
      </div>
    </div>
  );
}
