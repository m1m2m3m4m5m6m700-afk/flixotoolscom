import { useState } from "react";
import { Label } from "@/components/ui/label";

export function DiscountCalculator() {
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");
  const [secondDiscount, setSecondDiscount] = useState("");

  const calculate = () => {
    const orig = parseFloat(original) || 0;
    const disc = parseFloat(discount) || 0;
    const disc2 = parseFloat(secondDiscount) || 0;

    const afterFirst = orig * (1 - disc / 100);
    const afterSecond = afterFirst * (1 - disc2 / 100);
    const totalSavings = orig - afterSecond;

    return {
      afterFirst,
      afterSecond,
      totalSavings,
      totalDiscountPercent: ((totalSavings / orig) * 100).toFixed(1),
    };
  };

  const result = calculate();
  const orig = parseFloat(original) || 0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Original Price
        </Label>
        <input
          type="number"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
          placeholder="100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            First Discount
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
              placeholder="20"
            />
            <span className="text-lg">%</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Second Discount
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={secondDiscount}
              onChange={(e) => setSecondDiscount(e.target.value)}
              className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
              placeholder="10"
            />
            <span className="text-lg">%</span>
          </div>
        </div>
      </div>

      {orig > 0 && (
        <>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-sm text-muted-foreground">Final Price</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(result.afterSecond)}</p>
            <p className="text-sm text-emerald-500 mt-2">
              You save {formatCurrency(result.totalSavings)} ({result.totalDiscountPercent}%)
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface/40 p-3">
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="text-lg font-bold">{formatCurrency(orig)}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/40 p-3">
              <p className="text-xs text-muted-foreground">After 1st</p>
              <p className="text-lg font-bold">{formatCurrency(result.afterFirst)}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
              <p className="text-xs text-muted-foreground">Final</p>
              <p className="text-lg font-bold text-emerald-500">
                {formatCurrency(result.afterSecond)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
