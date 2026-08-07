import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function BMICalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const calculateBMI = () => {
    if (unit === "metric") {
      return weight / Math.pow(height / 100, 2);
    }
    return (weight * 703) / Math.pow(height, 2);
  };

  const bmi = calculateBMI();

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { text: "Normal", color: "text-emerald-500" };
    if (bmi < 30) return { text: "Overweight", color: "text-amber-500" };
    return { text: "Obese", color: "text-destructive" };
  };

  const category = getCategory(bmi);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="flex justify-center">
        <div className="flex rounded-lg border border-border p-1">
          <button
            onClick={() => setUnit("metric")}
            className={`px-3 py-1 text-sm rounded ${
              unit === "metric" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-3 py-1 text-sm rounded ${
              unit === "imperial" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Imperial
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
          </Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="text-lg font-medium"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {unit === "metric" ? "Height (cm)" : "Height (in)"}
          </Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="text-lg font-medium"
          />
        </div>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Your BMI</p>
        <p className={`text-5xl font-bold ${category.color}`}>{bmi.toFixed(1)}</p>
        <p className={`text-lg font-medium ${category.color}`}>{category.text}</p>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          BMI Scale
        </Label>
        <div className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-destructive" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>&lt;18.5</span>
          <span>18.5-24.9</span>
          <span>25-29.9</span>
          <span>&gt;30</span>
        </div>
      </div>
    </div>
  );
}
