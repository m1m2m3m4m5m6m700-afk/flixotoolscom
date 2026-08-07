"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Calculator, RefreshCw, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ROIMode = "simple" | "annualized";

export function ROICalculator() {
  const [mode, setMode] = useState<ROIMode>("simple");
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [holdingPeriod, setHoldingPeriod] = useState(3); // years
  const [showComparison, setShowComparison] = useState(false);

  const calculations = useMemo(() => {
    const gainLoss = finalValue - initialInvestment;
    const roi =
      initialInvestment > 0 ? ((finalValue - initialInvestment) / initialInvestment) * 100 : 0;
    const annualizedReturn =
      holdingPeriod > 0
        ? (Math.pow(finalValue / initialInvestment, 1 / holdingPeriod) - 1) * 100
        : 0;

    // Break-even calculation
    const breakevenValue = initialInvestment;
    const breakevenGain = 0;

    return {
      gainLoss,
      roi,
      annualizedReturn,
      breakevenValue,
      breakevenGain,
      profitLossRatio: gainLoss !== 0 ? Math.abs(initialInvestment / gainLoss) : 0,
    };
  }, [initialInvestment, finalValue, holdingPeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getROIColor = (roi: number) => {
    if (roi > 20) return "text-emerald-600";
    if (roi > 0) return "text-emerald-500";
    if (roi === 0) return "text-muted-foreground";
    return "text-red-500";
  };

  const getROIBadgeColor = (roi: number) => {
    if (roi > 0) return "bg-emerald-500/10 text-emerald-600";
    if (roi < 0) return "bg-red-500/10 text-red-600";
    return "bg-muted text-muted-foreground";
  };

  const handleReset = () => {
    setInitialInvestment(10000);
    setFinalValue(15000);
    setHoldingPeriod(3);
    setMode("simple");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          onClick={() => setMode("simple")}
          variant={mode === "simple" ? "default" : "outline"}
          size="sm"
        >
          Simple ROI
        </Button>
        <Button
          onClick={() => setMode("annualized")}
          variant={mode === "annualized" ? "default" : "outline"}
          size="sm"
        >
          Annualized ROI
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initialInvestment" className="text-sm font-medium">
              Initial Investment
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="finalValue" className="text-sm font-medium">
              Final Value
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="finalValue"
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
              />
            </div>
          </div>

          {mode === "annualized" && (
            <div className="space-y-2">
              <Label htmlFor="holdingPeriod" className="text-sm font-medium">
                Holding Period ({holdingPeriod} years)
              </Label>
              <input
                id="holdingPeriod"
                type="range"
                min="1"
                max="30"
                step="1"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 year</span>
                <span>{holdingPeriod} years</span>
                <span>30 years</span>
              </div>
            </div>
          )}

          <Button
            onClick={() => setShowComparison(!showComparison)}
            variant="outline"
            className="w-full"
          >
            {showComparison ? "Hide" : "Show"} Comparison
          </Button>
        </div>

        <div className="space-y-4">
          <div
            className={`rounded-xl border border-border p-6 text-center ${calculations.gainLoss >= 0 ? "bg-emerald-500/5" : "bg-red-500/5"}`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {calculations.gainLoss >= 0 ? (
                <TrendingUp className="size-6 text-emerald-600" />
              ) : (
                <TrendingDown className="size-6 text-red-600" />
              )}
              <span className="text-sm text-muted-foreground">
                {calculations.gainLoss >= 0 ? "Total Gain" : "Total Loss"}
              </span>
            </div>
            <p
              className={`text-4xl font-bold ${calculations.gainLoss >= 0 ? "text-emerald-600" : "text-red-600"}`}
            >
              {formatCurrency(Math.abs(calculations.gainLoss))}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {calculations.gainLoss >= 0 ? "+" : "-"}
              {formatCurrency(initialInvestment)} investment
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                {mode === "simple" ? "Simple ROI" : "Annualized ROI"}
              </p>
              <p className={`text-5xl font-bold ${getROIColor(calculations.roi)}`}>
                {calculations.roi.toFixed(2)}%
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getROIBadgeColor(calculations.roi)}`}
              >
                {calculations.roi >= 0 ? "Profitable" : "Loss"}
              </span>
            </div>

            {mode === "annualized" && calculations.roi !== calculations.annualizedReturn && (
              <div className="border-t border-border pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Simple ROI</p>
                  <p className={`text-2xl font-bold ${getROIColor(calculations.roi)}`}>
                    {calculations.roi.toFixed(2)}%
                  </p>
                </div>
              </div>
            )}
          </div>

          {showComparison && (
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <h4 className="text-sm font-semibold mb-3">Investment Benchmarks</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">S&P 500 Avg (~10%)</span>
                  <span className={calculations.roi > 10 ? "text-emerald-600" : "text-red-500"}>
                    {calculations.roi > 10 ? "Above" : "Below"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Savings Account (~5%)</span>
                  <span className={calculations.roi > 5 ? "text-emerald-600" : "text-red-500"}>
                    {calculations.roi > 5 ? "Above" : "Below"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inflation (~3%)</span>
                  <span className={calculations.roi > 3 ? "text-emerald-600" : "text-red-500"}>
                    {calculations.roi > 3 ? "Above" : "Below"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <h4 className="text-sm font-semibold mb-2">How ROI is Calculated</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-mono bg-background p-2 rounded">
            Simple ROI = ((Final Value - Initial Investment) / Initial Investment) × 100
          </p>
          {mode === "annualized" && (
            <p className="font-mono bg-background p-2 rounded">
              Annualized ROI = ((Final Value / Initial Investment)^(1/Years) - 1) × 100
            </p>
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
