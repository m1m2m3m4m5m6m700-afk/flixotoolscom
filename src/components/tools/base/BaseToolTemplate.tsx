import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

interface BaseToolTemplateProps {
  title: string;
  description: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  onProcess: (input: string, options?: Record<string, unknown>) => string | Promise<string>;
  options?: Array<{
    key: string;
    label: string;
    type: "toggle" | "slider";
    defaultValue: boolean | number;
    min?: number;
    max?: number;
    step?: number;
  }>;
  sampleInput?: string;
}

export function BaseToolTemplate({
  title,
  description,
  inputPlaceholder = "Enter text here...",
  outputPlaceholder = "Result will appear here...",
  onProcess,
  options = [],
  sampleInput = "",
}: BaseToolTemplateProps) {
  const [input, setInput] = useState(sampleInput);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [optionValues, setOptionValues] = useState<Record<string, boolean | number>>(() => {
    const defaults: Record<string, boolean | number> = {};
    options.forEach((opt) => {
      defaults[opt.key] = opt.defaultValue;
    });
    return defaults;
  });

  const handleProcess = useCallback(async () => {
    if (!input.trim()) return;
    setProcessing(true);
    try {
      const result = await onProcess(input, optionValues);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setProcessing(false);
    }
  }, [input, optionValues, onProcess]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction(title.toLowerCase(), output.length, title.toLowerCase().replace(/\s+/g, "-"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-result.txt`;
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction(a.download, "text/plain", title.toLowerCase().replace(/\s+/g, "-"));
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6">
      {/* Options */}
      {options.length > 0 && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {options.map((opt) => (
            <div
              key={opt.key}
              className="flex items-center justify-between rounded-2xl border border-border/60 bg-surface/40 p-4"
            >
              <Label className="text-xs font-semibold">{opt.label}</Label>
              {opt.type === "toggle" && (
                <Switch
                  checked={optionValues[opt.key] as boolean}
                  onCheckedChange={(checked) =>
                    setOptionValues((prev) => ({ ...prev, [opt.key]: checked }))
                  }
                />
              )}
              {opt.type === "slider" && (
                <Slider
                  value={[optionValues[opt.key] as number]}
                  min={opt.min ?? 0}
                  max={opt.max ?? 100}
                  step={opt.step ?? 1}
                  onValueChange={(val) =>
                    setOptionValues((prev) => ({ ...prev, [opt.key]: val[0] }))
                  }
                  className="w-24"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="mb-4">
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input
        </Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          className="min-h-[120px] rounded-xl"
        />
      </div>

      {/* Process Button */}
      <div className="mb-4 flex gap-3">
        <Button onClick={handleProcess} disabled={processing || !input.trim()} className="flex-1">
          {processing ? "Processing..." : description}
        </Button>
        {sampleInput && (
          <Button
            variant="outline"
            onClick={() => {
              setInput(sampleInput);
              setOutput("");
            }}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Output */}
      <div className="mb-4">
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Output
        </Label>
        <div className="relative">
          <Textarea
            value={output}
            readOnly
            placeholder={outputPlaceholder}
            className="min-h-[120px] rounded-xl bg-muted/30"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={handleCopy} disabled={!output} className="flex-1">
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy Result"}
        </Button>
        <Button variant="outline" onClick={handleDownload} disabled={!output} className="flex-1">
          <Download className="mr-2 size-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
