import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function TipCalculator() {
  const [bill, setBill] = useState(100);
  const [tipPercent, setTipPercent] = useState([18]);
  const [split, setSplit] = useState(1);

  const tipAmount = (bill * tipPercent[0]) / 100;
  const total = bill + tipAmount;
  const perPerson = split > 0 ? total / split : total;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Bill Amount
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="pl-8 text-lg font-medium"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tip Percentage
          </Label>
          <span className="text-sm font-medium">{tipPercent[0]}%</span>
        </div>
        <Slider value={tipPercent} onValueChange={setTipPercent} min={0} max={30} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>15%</span>
          <span>30%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Split Bill
          </Label>
          <span className="text-sm font-medium">
            {split} {split === 1 ? "person" : "people"}
          </span>
        </div>
        <Slider value={[split]} onValueChange={([v]) => setSplit(v)} min={1} max={20} step={1} />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Tip Amount</p>
        <p className="text-2xl font-bold text-primary">{formatCurrency(tipAmount)}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-xl font-bold">{formatCurrency(total)}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="text-xs text-muted-foreground">Per Person</p>
          <p className="text-xl font-bold">{formatCurrency(perPerson)}</p>
        </div>
      </div>
    </div>
  );
}
