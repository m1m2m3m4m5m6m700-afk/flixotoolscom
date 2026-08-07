/**
 * Reusable Validator Tool Engine
 * Generic component for validation tools
 */
import { useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertCircle, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ValidatorConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  validate: (input: string) => { valid: boolean; errors: string[]; warnings?: string[] };
  placeholder?: string;
  examples?: string[];
}

export function createValidatorTool(config: ValidatorConfig) {
  return function ValidatorToolComponent() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<{ valid: boolean; errors: string[]; warnings?: string[] } | null>(null);

    const handleValidate = useCallback(() => {
      const validationResult = config.validate(input);
      setResult(validationResult);
    }, [input, config]);

    const handleExample = useCallback((example: string) => {
      setInput(example);
      setResult(config.validate(example));
    }, [config]);

    const handleClear = useCallback(() => {
      setInput("");
      setResult(null);
    }, []);

    return (
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder || "Enter data to validate..."}
            className="min-h-[150px] font-mono text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleValidate}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Validate
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Examples */}
        {config.examples && config.examples.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {config.examples.map((example, i) => (
                <button
                  key={i}
                  onClick={() => handleExample(example)}
                  className="px-3 py-1 text-xs rounded-full border hover:bg-muted transition-colors font-mono truncate max-w-[200px]"
                  title={example}
                >
                  {example.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`p-4 rounded-xl border ${
            result.valid 
              ? "bg-green-500/10 border-green-500/30" 
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {result.valid ? (
                <CheckCircle className="size-5 text-green-600" />
              ) : (
                <XCircle className="size-5 text-red-600" />
              )}
              <span className={`font-semibold ${result.valid ? "text-green-600" : "text-red-600"}`}>
                {result.valid ? "Valid" : "Invalid"}
              </span>
            </div>

            {result.errors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-600">Errors:</p>
                <ul className="space-y-1">
                  {result.errors.map((error, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <XCircle className="size-4 mt-0.5 shrink-0" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.warnings && result.warnings.length > 0 && (
              <div className="mt-3 pt-3 border-t border-red-200/30 space-y-2">
                <p className="text-sm font-medium text-yellow-600">Warnings:</p>
                <ul className="space-y-1">
                  {result.warnings.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-yellow-700">
                      <AlertCircle className="size-4 mt-0.5 shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
}
