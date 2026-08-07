"use client";

import { useState, useMemo } from "react";
import { Calculator, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState(300000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculations = useMemo(() => {
    const downPayment = principal * (downPaymentPercent / 100);
    const loanAmount = principal - downPayment;
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;

    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        : loanAmount / numPayments;

    const totalPayment = monthlyRate > 0 ? monthlyPayment * numPayments : loanAmount;
    const totalInterest = monthlyRate > 0 ? totalPayment - loanAmount : 0;

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;

    for (let month = 1; month <= numPayments && month <= 360; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });
    }

    return {
      downPayment,
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPayment,
      schedule,
    };
  }, [principal, annualRate, years, downPaymentPercent]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDownload = () => {
    const schedule = calculations.schedule;
    const csv = [
      "Month,Payment,Principal,Interest,Balance",
      ...schedule.map(
        (row) =>
          `${row.month},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}`,
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage-amortization.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPrincipal(300000);
    setAnnualRate(6.5);
    setYears(30);
    setDownPaymentPercent(20);
    setShowSchedule(false);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="homePrice" className="text-sm font-medium">
              Home Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="homePrice"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment" className="text-sm font-medium">
              Down Payment ({downPaymentPercent}%)
            </Label>
            <input
              id="downPayment"
              type="range"
              min="0"
              max="50"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>{formatCurrency(calculations.downPayment)}</span>
              <span>50%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="text-sm font-medium">
              Interest Rate ({annualRate}%)
            </Label>
            <input
              id="interestRate"
              type="range"
              min="0.1"
              max="15"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.1%</span>
              <span>{annualRate}%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="text-sm font-medium">
              Loan Term ({years} years)
            </Label>
            <select
              id="loanTerm"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background px-4 py-2"
            >
              <option value={10}>10 years</option>
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={25}>25 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <h3 className="text-lg font-semibold">Results</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(calculations.loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Down Payment</p>
                <p className="text-xl font-bold">{formatCurrency(calculations.downPayment)}</p>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(calculations.monthlyPayment)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(calculations.totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payment</p>
                <p className="text-lg font-semibold">{formatCurrency(calculations.totalPayment)}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setShowSchedule(!showSchedule)}
              variant="outline"
              className="flex-1"
            >
              {showSchedule ? "Hide" : "Show"} Schedule
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="size-4 mr-2" />
              CSV
            </Button>
          </div>

          {showSchedule && (
            <div className="rounded-xl border border-border bg-muted/30 p-4 max-h-[200px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted">
                  <tr>
                    <th className="text-left py-1">#</th>
                    <th className="text-right py-1">Payment</th>
                    <th className="text-right py-1">Principal</th>
                    <th className="text-right py-1">Interest</th>
                    <th className="text-right py-1">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.slice(0, 60).map((row) => (
                    <tr key={row.month} className="border-t border-border/50">
                      <td className="py-1">{row.month}</td>
                      <td className="text-right">{formatCurrency(row.payment)}</td>
                      <td className="text-right text-emerald-600">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="text-right text-red-500">{formatCurrency(row.interest)}</td>
                      <td className="text-right">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {calculations.schedule.length > 60 && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Showing first 60 months. Download CSV for full schedule.
                </p>
              )}
            </div>
          )}
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
