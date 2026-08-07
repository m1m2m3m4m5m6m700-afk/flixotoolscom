/**
 * Reusable Converter Tool Engine
 * Generic component for unit/data conversion tools
 */
import { useState, useCallback } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";

interface ConverterConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  units: string[];
  convert: (value: number, from: string, to: string) => number;
}

export function createConverterTool(config: ConverterConfig) {
  return function ConverterToolComponent() {
    const [inputValue, setInputValue] = useState("1");
    const [fromUnit, setFromUnit] = useState(config.units[0]);
    const [toUnit, setToUnit] = useState(config.units[1]);
    const [result, setResult] = useState("");
    const [copied, setCopied] = useState(false);

    const handleConvert = useCallback(() => {
      const value = parseFloat(inputValue);
      if (isNaN(value)) {
        setResult("Invalid input");
        return;
      }
      const converted = config.convert(value, fromUnit, toUnit);
      setResult(converted.toFixed(6).replace(/\.?0+$/, ""));
    }, [inputValue, fromUnit, toUnit, config]);

    const handleSwap = useCallback(() => {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }, [fromUnit, toUnit]);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [result]);

    const handleInputChange = useCallback((value: string) => {
      setInputValue(value);
      if (value && !isNaN(parseFloat(value))) {
        const converted = config.convert(parseFloat(value), fromUnit, toUnit);
        setResult(converted.toFixed(6).replace(/\.?0+$/, ""));
      } else {
        setResult("");
      }
    }, [fromUnit, toUnit, config]);

    return (
      <div className="space-y-6">
        {/* Conversion Row */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <label className="text-sm font-medium mb-1 block">From</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border bg-background text-lg font-mono"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <select
              className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm"
              value={fromUnit}
              onChange={(e) => handleInputChange(inputValue || "0")}
            >
              {config.units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="mt-6 p-2 rounded-full border hover:bg-muted transition-colors"
            aria-label="Swap units"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="flex-1 min-w-[120px]">
            <label className="text-sm font-medium mb-1 block">To</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border bg-muted/50 text-lg font-mono"
              value={result}
              readOnly
              placeholder="Result"
            />
            <select
              className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm"
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                if (inputValue && !isNaN(parseFloat(inputValue))) {
                  const converted = config.convert(parseFloat(inputValue), fromUnit, e.target.value);
                  setResult(converted.toFixed(6).replace(/\.?0+$/, ""));
                }
              }}
            >
              {config.units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleConvert}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Convert
          </button>
          {result && (
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg border hover:bg-muted transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>
          )}
        </div>

        {/* Common Conversions */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Quick Conversions</h3>
          <div className="grid gap-2 text-sm">
            {config.units.slice(0, 4).map((unit) => {
              if (unit === fromUnit) return null;
              const converted = config.convert(1, fromUnit, unit);
              return (
                <div key={unit} className="flex justify-between">
                  <span>1 {fromUnit} =</span>
                  <span className="font-mono">{converted.toFixed(4).replace(/\.?0+$/, "")} {unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
}
