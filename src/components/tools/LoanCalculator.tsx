import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(250000);
  const [rate, setRate] = useState([6.5]);
  const [years, setYears] = useState([30]);

  const monthlyRate = rate[0] / 100 / 12;
  const numPayments = years[0] * 12;

  const monthlyPayment =
    principal *
    ((monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1));

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

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
            Loan Amount
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
            Interest Rate
          </Label>
          <span className="text-sm font-medium">{rate[0].toFixed(1)}%</span>
        </div>
        <Slider value={rate} onValueChange={setRate} min={1} max={15} step={0.1} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Loan Term
          </Label>
          <span className="text-sm font-medium">{years[0]} years</span>
        </div>
        <Slider value={years} onValueChange={setYears} min={1} max={30} step={1} />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Monthly Payment</p>
        <p className="text-4xl font-bold text-primary">
          {formatCurrency(Math.round(monthlyPayment))}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Total Interest</p>
          <p className="text-lg font-bold">{formatCurrency(Math.round(totalInterest))}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Total Payment</p>
          <p className="text-lg font-bold">{formatCurrency(Math.round(totalPayment))}</p>
        </div>
      </div>
    </div>
  );
}
