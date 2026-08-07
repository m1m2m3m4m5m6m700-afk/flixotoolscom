"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type CalculationMode = "cost-sell" | "sell-margin" | "cost-margin";

export function ProfitMarginCalculator() {
  const [mode, setMode] = useState<CalculationMode>("cost-sell");
  const [costPrice, setCostPrice] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(75);

  const calculations = useMemo(() => {
    const profit = sellingPrice - costPrice;
    const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const grossMargin = costPrice > 0 ? (profit / costPrice) * 100 : 0; // Markup
    const revenue = sellingPrice;

    return {
      profit,
      profitMargin,
      grossMargin,
      revenue,
    };
  }, [costPrice, sellingPrice]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleReset = () => {
    setCostPrice(50);
    setSellingPrice(75);
    setMode("cost-sell");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          onClick={() => setMode("cost-sell")}
          variant={mode === "cost-sell" ? "default" : "outline"}
          size="sm"
        >
          Cost + Sell Price
        </Button>
        <Button
          onClick={() => setMode("sell-margin")}
          variant={mode === "sell-margin" ? "default" : "outline"}
          size="sm"
        >
          Cost + Margin
        </Button>
        <Button
          onClick={() => setMode("cost-margin")}
          variant={mode === "cost-margin" ? "default" : "outline"}
          size="sm"
        >
          Sell Price + Margin
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="costPrice" className="text-sm font-medium">
              Cost Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="costPrice"
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sellingPrice" className="text-sm font-medium">
              {mode === "sell-margin" ? "Selling Price (calculated)" : "Selling Price"}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="sellingPrice"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
                disabled={mode === "sell-margin"}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Gross Profit</p>
              <p
                className={`text-4xl font-bold ${calculations.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}
              >
                {formatCurrency(calculations.profit)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-center">
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p
                  className={`text-2xl font-bold ${calculations.profitMargin >= 0 ? "text-primary" : "text-red-600"}`}
                >
                  {calculations.profitMargin.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">of revenue</p>
              </div>
              <div className="rounded-lg bg-secondary/10 p-3 text-center">
                <p className="text-sm text-muted-foreground">Markup</p>
                <p
                  className={`text-2xl font-bold ${calculations.grossMargin >= 0 ? "text-secondary" : "text-red-600"}`}
                >
                  {calculations.grossMargin.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">of cost</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Revenue</span>
                <span className="font-medium">{formatCurrency(calculations.revenue)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-medium">{formatCurrency(costPrice)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Margin vs Markup</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin %</span>
                <span>= (Profit / Selling Price) × 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Markup %</span>
                <span>= (Profit / Cost) × 100</span>
              </div>
            </div>
          </div>
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
