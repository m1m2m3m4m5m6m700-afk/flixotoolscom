import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

export function JSONValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    error?: string;
    parsed?: unknown;
  } | null>(null);

  const validate = () => {
    try {
      const parsed = JSON.parse(input);
      setResult({ valid: true, parsed });
    } catch (e) {
      setResult({
        valid: false,
        error: e instanceof Error ? e.message : "Invalid JSON",
      });
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JSON Input
        </Label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setResult(null);
          }}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder='{"key": "value"}'
        />
      </div>

      <button
        onClick={validate}
        disabled={!input.trim()}
        className="w-full rounded-xl bg-primary p-3 font-medium text-primary-foreground disabled:opacity-50"
      >
        Validate JSON
      </button>

      {result && (
        <div
          className={`rounded-xl border p-4 ${
            result.valid
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-destructive/30 bg-destructive/10"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {result.valid ? (
              <Check className="size-5 text-emerald-500" />
            ) : (
              <X className="size-5 text-destructive" />
            )}
            <span
              className={`font-medium ${result.valid ? "text-emerald-500" : "text-destructive"}`}
            >
              {result.valid ? "Valid JSON" : "Invalid JSON"}
            </span>
          </div>

          {result.error && <p className="text-sm text-destructive font-mono">{result.error}</p>}

          {result.valid && result.parsed !== undefined && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Parsed Structure:</p>
              <pre className="text-xs bg-muted/50 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(result.parsed as object, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
