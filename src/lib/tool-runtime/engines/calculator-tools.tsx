/**
 * Reusable Calculator Tool Engine
 * Generic component for calculation tools
 */
import { useState, useCallback, useMemo } from "react";
import { Calculator } from "lucide-react";

interface CalculatorConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  inputs: Array<{
    id: string;
    label: string;
    type: "number" | "select" | "text";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    defaultValue?: string | number;
    min?: number;
    max?: number;
    step?: number;
  }>;
  calculate: (inputs: Record<string, unknown>) => { value: number; label: string; breakdown?: Array<{ label: string; value: string }> };
  resultLabel: string;
  resultUnit?: string;
}

export function createCalculatorTool(config: CalculatorConfig) {
  return function CalculatorToolComponent() {
    const [inputs, setInputs] = useState<Record<string, unknown>>(
      config.inputs.reduce((acc, input) => {
        acc[input.id] = input.defaultValue ?? "";
        return acc;
      }, {} as Record<string, unknown>)
    );
    const [result, setResult] = useState<{ value: number; label: string; breakdown?: Array<{ label: string; value: string }> } | null>(null);

    const handleCalculate = useCallback(() => {
      const calcResult = config.calculate(inputs);
      setResult(calcResult);
    }, [inputs, config]);

    const formatNumber = useCallback((num: number) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(num);
    }, []);

    return (
      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          {config.inputs.map((input) => (
            <div key={input.id} className="space-y-1">
              <label className="text-sm font-medium">{input.label}</label>
              {input.type === "number" && (
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border bg-background text-lg"
                  value={inputs[input.id] as number}
                  onChange={(e) => setInputs(prev => ({ ...prev, [input.id]: parseFloat(e.target.value) || 0 }))}
                  placeholder={input.placeholder}
                  min={input.min}
                  max={input.max}
                  step={input.step || 1}
                />
              )}
              {input.type === "select" && (
                <select
                  className="w-full px-4 py-3 rounded-xl border bg-background text-lg"
                  value={inputs[input.id] as string}
                  onChange={(e) => setInputs(prev => ({ ...prev, [input.id]: e.target.value }))}
                >
                  {input.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
              {input.type === "text" && (
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border bg-background text-lg"
                  value={inputs[input.id] as string}
                  onChange={(e) => setInputs(prev => ({ ...prev, [input.id]: e.target.value }))}
                  placeholder={input.placeholder}
                />
              )}
            </div>
          ))}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Calculator className="size-5" />
          Calculate
        </button>

        {/* Result */}
        {result && (
          <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{config.resultLabel}</p>
              <p className="text-4xl font-bold text-primary mt-2">
                {config.resultUnit ? `${formatNumber(result.value)} ${config.resultUnit}` : formatNumber(result.value)}
              </p>
            </div>

            {result.breakdown && result.breakdown.length > 0 && (
              <div className="pt-4 border-t border-primary/20">
                <h3 className="text-sm font-medium mb-2">Breakdown</h3>
                <div className="space-y-2">
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
}
