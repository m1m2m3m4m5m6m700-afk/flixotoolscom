/**
 * BMI Calculator Tool
 * Calculate Body Mass Index
 */
import { Activity } from "lucide-react";
import { createCalculatorTool } from "../engines/calculator-tools";

export const bmiCalculatorTool = {
  id: "bmi-calculator",
  slug: "bmi-calculator",
  name: "BMI Calculator",
  description: "Calculate your Body Mass Index (BMI) to understand your weight category. Supports both metric and imperial units.",
  icon: Activity,
  category: "calculators" as const,
  tags: ["bmi", "body", "mass", "index", "weight", "health", "calculator"],
  status: "ready" as const,
  runtime: createCalculatorTool({
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index",
    icon: Activity,
    inputs: [
      {
        id: "weight",
        label: "Weight",
        type: "number",
        placeholder: "Enter weight",
        min: 1,
        max: 500,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        placeholder: "Enter height",
        min: 1,
        max: 300,
      },
      {
        id: "unit",
        label: "Unit System",
        type: "select",
        options: [
          { value: "metric", label: "Metric (kg/cm)" },
          { value: "imperial", label: "Imperial (lb/in)" },
        ],
        defaultValue: "metric",
      },
    ],
    calculate: (inputs) => {
      const weight = inputs.weight as number;
      const height = inputs.height as number;
      const unit = inputs.unit as string;

      let bmi: number;
      let category: string;

      if (unit === "metric") {
        bmi = weight / Math.pow(height / 100, 2);
      } else {
        bmi = (weight / Math.pow(height, 2)) * 703;
      }

      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal weight";
      else if (bmi < 30) category = "Overweight";
      else category = "Obese";

      return {
        value: Math.round(bmi * 10) / 10,
        label: category,
        breakdown: [
          { label: "BMI Value", value: String(Math.round(bmi * 10) / 10) },
          { label: "Category", value: category },
          { label: "Weight Range", value: unit === "metric" ? `${(18.5 * Math.pow(height / 100, 2)).toFixed(1)}-${(24.9 * Math.pow(height / 100, 2)).toFixed(1)} kg` : `${(18.5 * Math.pow(height, 2) / 703).toFixed(1)}-${(24.9 * Math.pow(height, 2) / 703).toFixed(1)} lb` },
        ],
      };
    },
    resultLabel: "Your BMI",
  }),
};

export default bmiCalculatorTool;
