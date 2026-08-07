import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Percent, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

type Operation = "percentOf" | "whatPercent" | "percentChange" | "increase" | "decrease";

export function PercentageCalculator() {
  const [operation, setOperation] = useState<Operation>("percentOf");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const result = useMemo(() => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) return null;

    switch (operation) {
      case "percentOf":
        return (n1 * n2) / 100;
      case "whatPercent":
        return n2 === 0 ? 0 : (n1 / n2) * 100;
      case "percentChange":
        return n2 === 0 ? 0 : ((n1 - n2) / n2) * 100;
      case "increase":
        return n2 * (1 + n1 / 100);
      case "decrease":
        return n2 * (1 - n1 / 100);
      default:
        return null;
    }
  }, [operation, num1, num2]);

  const operationLabels: Record<Operation, { label: string; input1: string; input2: string }> = {
    percentOf: { label: "Calculate X% of Y", input1: "Percentage (%)", input2: "Number" },
    whatPercent: { label: "X is what % of Y", input1: "Value", input2: "Total" },
    percentChange: { label: "Change from X to Y", input1: "New Value", input2: "Original Value" },
    increase: { label: "Increase by X%", input1: "Percentage (%)", input2: "Original Value" },
    decrease: { label: "Decrease by X%", input1: "Percentage (%)", input2: "Original Value" },
  };

  const isChangeOperation =
    operation === "percentChange" || operation === "increase" || operation === "decrease";

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Operation Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {(Object.keys(operationLabels) as Operation[]).map((op) => (
          <Button
            key={op}
            variant={operation === op ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setOperation(op);
              setNum1("");
              setNum2("");
            }}
            className="text-xs h-auto py-2"
          >
            {operationLabels[op].label}
          </Button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {operationLabels[operation].input1}
          </Label>
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="0"
            className="h-12 font-mono text-lg"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {operationLabels[operation].input2}
          </Label>
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="0"
            className="h-12 font-mono text-lg"
          />
        </div>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Result</p>
          <p className="text-4xl font-bold font-mono text-primary">
            {isNaN(result)
              ? "Error"
              : result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            {(operation === "percentOf" ||
              operation === "whatPercent" ||
              operation === "percentChange") && <span className="text-2xl">%</span>}
          </p>

          {/* Explanation */}
          <div className="mt-4 text-sm text-muted-foreground">
            {operation === "percentOf" && num1 && num2 && (
              <p>
                {num1}% of {num2} = {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            )}
            {operation === "whatPercent" && num1 && num2 && (
              <p>
                {num1} is {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}% of{" "}
                {num2}
              </p>
            )}
            {operation === "percentChange" && num1 && num2 && (
              <p className="flex items-center justify-center gap-2">
                Change from {num2} to {num1}: {result >= 0 ? "+" : ""}
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                {result >= 0 ? (
                  <TrendingUp className="size-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="size-4 text-destructive" />
                )}
              </p>
            )}
            {operation === "increase" && num1 && num2 && (
              <p>
                {num1}% increase on {num2} ={" "}
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            )}
            {operation === "decrease" && num1 && num2 && (
              <p>
                {num1}% decrease on {num2} ={" "}
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Common Calculations
        </Label>
        <div className="grid gap-2 sm:grid-cols-2">
          <QuickCalc
            label="15% tip on $50"
            onClick={() => {
              setOperation("percentOf");
              setNum1("15");
              setNum2("50");
            }}
          />
          <QuickCalc
            label="Discount: 30% off $120"
            onClick={() => {
              setOperation("decrease");
              setNum1("30");
              setNum2("120");
            }}
          />
          <QuickCalc
            label="Markup: add 20% to $80"
            onClick={() => {
              setOperation("increase");
              setNum1("20");
              setNum2("80");
            }}
          />
          <QuickCalc
            label="Price change: $80 to $100"
            onClick={() => {
              setOperation("percentChange");
              setNum1("100");
              setNum2("80");
            }}
          />
        </div>
      </div>
    </div>
  );
}

function QuickCalc({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="justify-start text-xs h-auto py-2"
    >
      <Calculator className="mr-2 size-3" />
      {label}
    </Button>
  );
}
