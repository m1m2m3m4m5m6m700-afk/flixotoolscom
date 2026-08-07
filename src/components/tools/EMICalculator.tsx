"use client";

import { useState, useMemo } from "react";
import { Calculator, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function EMICalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(10);
  const [tenureMonths, setTenureMonths] = useState(24);

  const calculations = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;

    // Generate breakdown by month
    let balance = principal;
    let totalPrincipalPaid = 0;
    let totalInterestPaid = 0;
    const breakdown: { month: number; principal: number; interest: number; balance: number }[] = [];

    for (let i = 1; i <= tenureMonths; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      totalPrincipalPaid += principalPayment;
      totalInterestPaid += interestPayment;

      breakdown.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });
    }

    return {
      emi,
      totalPayment,
      totalInterest,
      breakdown,
    };
  }, [principal, annualRate, tenureMonths]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDownload = () => {
    const csv = [
      "Month,Principal,Interest,Balance",
      ...calculations.breakdown.map(
        (row) =>
          `${row.month},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}`,
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPrincipal(100000);
    setAnnualRate(10);
    setTenureMonths(24);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="text-sm font-medium">
              Loan Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <input
                id="loanAmount"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="text-sm font-medium">
              Annual Interest Rate ({annualRate}%)
            </Label>
            <input
              id="interestRate"
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>{annualRate}%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenure" className="text-sm font-medium">
              Tenure ({tenureMonths} months / {Math.floor(tenureMonths / 12)} years)
            </Label>
            <input
              id="tenure"
              type="range"
              min="6"
              max="360"
              step="6"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>6 months</span>
              <span>{tenureMonths} months</span>
              <span>30 years</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleDownload} variant="outline" className="flex-1">
              <Download className="size-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <h3 className="text-lg font-semibold">EMI Results</h3>

            <div className="text-center py-4 border-y border-border">
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(calculations.emi)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
                <p className="text-sm text-muted-foreground">Principal</p>
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(principal)}</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3 text-center">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-lg font-bold text-red-600">
                  {formatCurrency(calculations.totalInterest)}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-xl font-bold">{formatCurrency(calculations.totalPayment)}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Interest vs Principal</p>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(principal / calculations.totalPayment) * 100}%` }}
              />
              <div
                className="bg-red-500 h-full"
                style={{
                  width: `${(calculations.totalInterest / calculations.totalPayment) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Principal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Interest
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <h4 className="text-sm font-semibold mb-2">EMI Breakdown (First 12 Months)</h4>
        <div className="max-h-[200px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted">
              <tr>
                <th className="text-left py-1">Month</th>
                <th className="text-right py-1">Principal</th>
                <th className="text-right py-1">Interest</th>
                <th className="text-right py-1">Balance</th>
              </tr>
            </thead>
            <tbody>
              {calculations.breakdown.slice(0, 12).map((row) => (
                <tr key={row.month} className="border-t border-border/50">
                  <td className="py-1">{row.month}</td>
                  <td className="text-right text-emerald-600">{formatCurrency(row.principal)}</td>
                  <td className="text-right text-red-500">{formatCurrency(row.interest)}</td>
                  <td className="text-right">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
