import { useState } from "react";
import { Label } from "@/components/ui/label";

export function TipSplitter() {
  const [bill, setBill] = useState("100");
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(2);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tipPercent / 100);
  const total = billNum + tipAmount;
  const perPerson = total / people;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Bill Amount
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 pl-8 font-mono text-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tip Percentage
        </Label>
        <div className="flex gap-2">
          {[10, 15, 18, 20, 25].map((p) => (
            <button
              key={p}
              onClick={() => setTipPercent(p)}
              className={`flex-1 rounded-lg border p-3 font-medium transition-colors ${
                tipPercent === p
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={tipPercent}
          onChange={(e) => setTipPercent(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Split Between
        </Label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPeople(Math.max(1, people - 1))}
            className="rounded-lg border border-border p-3 hover:bg-muted"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
            className="flex-1 rounded-xl border border-border bg-background p-3 text-center font-mono text-lg"
          />
          <button
            onClick={() => setPeople(people + 1)}
            className="rounded-lg border border-border p-3 hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between rounded-lg border border-border bg-muted/30 p-4">
          <span className="text-muted-foreground">Bill</span>
          <span className="font-mono">${billNum.toFixed(2)}</span>
        </div>
        <div className="flex justify-between rounded-lg border border-border bg-muted/30 p-4">
          <span className="text-muted-foreground">Tip ({tipPercent}%)</span>
          <span className="font-mono text-emerald-600">+${tipAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
          <span className="font-semibold">Total</span>
          <span className="font-mono font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-primary bg-primary p-8 text-center text-primary-foreground">
        <p className="text-xs uppercase tracking-wider opacity-80">Per Person</p>
        <p className="text-4xl font-bold mt-1">${perPerson.toFixed(2)}</p>
      </div>
    </div>
  );
}
