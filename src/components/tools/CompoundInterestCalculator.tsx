"use client";

import { useState, useCallback } from "react";
import { Calculator, Copy, Check, RefreshCw, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type CompoundFrequency = "annually" | "semiannually" | "quarterly" | "monthly" | "daily";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState<CompoundFrequency>("annually");
  const [monthlyContribution, setMonthlyContribution] = useState("0");
  const [result, setResult] = useState<{
    totalAmount: number;
    totalInterest: number;
    yearlyBreakdown: { year: number; balance: number; interest: number }[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const getCompoundingPeriods = (freq: CompoundFrequency): number => {
    switch (freq) {
      case "annually":
        return 1;
      case "semiannually":
        return 2;
      case "quarterly":
        return 4;
      case "monthly":
        return 12;
      case "daily":
        return 365;
    }
  };

  const calculate = useCallback(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = getCompoundingPeriods(frequency);
    const monthly = parseFloat(monthlyContribution) || 0;

    const yearlyBreakdown: { year: number; balance: number; interest: number }[] = [];

    let totalAmount = P;
    for (let year = 1; year <= t; year++) {
      // Calculate for this year
      const startBalance = totalAmount;
      let yearEndBalance = startBalance;

      for (let month = 0; month < 12; month++) {
        // Add monthly contribution at start of each month
        if (monthly > 0) {
          yearEndBalance += monthly;
        }
        // Apply interest for this period
        yearEndBalance = yearEndBalance * (1 + r / n);
      }

      const yearInterest = yearEndBalance - startBalance - monthly * 12;
      yearlyBreakdown.push({
        year,
        balance: yearEndBalance,
        interest: yearInterest,
      });

      totalAmount = yearEndBalance;
    }

    const totalInterest = totalAmount - P - monthly * 12 * t;

    setResult({
      totalAmount,
      totalInterest,
      yearlyBreakdown,
    });
  }, [principal, rate, years, frequency, monthlyContribution]);

  const handleCopy = async () => {
    if (!result) return;
    const text = `Principal: $${parseFloat(principal).toLocaleString()}
Rate: ${rate}%
Years: ${years}
Frequency: ${frequency}
Monthly Contribution: $${parseFloat(monthlyContribution).toLocaleString()}
Total Amount: $${result.totalAmount.toFixed(2)}
Total Interest: $${result.totalInterest.toFixed(2)}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPrincipal("10000");
    setRate("5");
    setYears("10");
    setFrequency("annually");
    setMonthlyContribution("0");
    setResult(null);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Principal Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="10000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <input
              id="rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Time Period (Years)</Label>
            <input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Compounding Frequency</Label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as CompoundFrequency)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="annually">Annually</option>
              <option value="semiannually">Semi-annually</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly">Monthly Contribution ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                id="monthly"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="0"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            <Calculator className="size-4 mr-2" />
            Calculate
          </Button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">
                    $
                    {result.totalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Principal</p>
                    <p className="text-lg font-semibold">
                      ${parseFloat(principal).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Interest Earned</p>
                    <p className="text-lg font-semibold text-emerald-500">
                      $
                      {result.totalInterest.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Yearly Breakdown</Label>
                  <Button onClick={handleCopy} variant="ghost" size="sm">
                    {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="max-h-[250px] overflow-y-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Year</th>
                        <th className="px-3 py-2 text-right font-medium">Balance</th>
                        <th className="px-3 py-2 text-right font-medium">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((row) => (
                        <tr key={row.year} className="border-t border-border">
                          <td className="px-3 py-2">{row.year}</td>
                          <td className="px-3 py-2 text-right">${row.balance.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right text-emerald-500">
                            ${row.interest.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground rounded-xl border border-border bg-muted/20">
              <TrendingUp className="size-12 mb-3 opacity-40" />
              <p>Enter values and click Calculate</p>
              <p className="text-sm">to see your compound interest</p>
            </div>
          )}
        </div>
      </div>

      <Button onClick={handleReset} variant="ghost" className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Reset
      </Button>
    </div>
  );
}
