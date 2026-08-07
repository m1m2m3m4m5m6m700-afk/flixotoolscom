/**
 * Reusable Generator Tool Engine
 * Generic component for content generation tools
 */
import { useState, useCallback } from "react";
import { Copy, Download, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface GeneratorConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  generate: (options: Record<string, unknown>) => string;
  options: Array<{
    id: string;
    label: string;
    type: "number" | "select" | "textarea" | "input";
    options?: string[];
    default?: unknown;
    min?: number;
    max?: number;
    placeholder?: string;
  }>;
}

export function createGeneratorTool(config: GeneratorConfig) {
  return function GeneratorToolComponent() {
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, unknown>>(
      config.options.reduce((acc, opt) => {
        acc[opt.id] = opt.default;
        return acc;
      }, {} as Record<string, unknown>)
    );

    const handleGenerate = useCallback(() => {
      const result = config.generate(selectedOptions);
      setOutput(result);
    }, [selectedOptions, config]);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [output]);

    const handleDownload = useCallback(() => {
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${config.id}-generated.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, [output, config.id]);

    return (
      <div className="space-y-6">
        {/* Options */}
        <div className="grid gap-4 p-4 bg-muted/50 rounded-lg md:grid-cols-2">
          {config.options.map((opt) => (
            <div key={opt.id} className="flex flex-col gap-1">
              <label className="text-sm font-medium">{opt.label}</label>
              {opt.type === "number" && (
                <input
                  type="number"
                  className="px-3 py-1.5 rounded-md border bg-background text-sm"
                  value={selectedOptions[opt.id] as number}
                  onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.id]: Number(e.target.value) }))}
                  min={opt.min}
                  max={opt.max}
                />
              )}
              {opt.type === "select" && (
                <select
                  className="px-3 py-1.5 rounded-md border bg-background text-sm"
                  value={selectedOptions[opt.id] as string}
                  onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.id]: e.target.value }))}
                >
                  {opt.options?.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              )}
              {opt.type === "input" && (
                <input
                  type="text"
                  className="px-3 py-1.5 rounded-md border bg-background text-sm"
                  value={selectedOptions[opt.id] as string}
                  onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.id]: e.target.value }))}
                  placeholder={opt.placeholder}
                />
              )}
              {opt.type === "textarea" && (
                <textarea
                  className="px-3 py-1.5 rounded-md border bg-background text-sm resize-none"
                  value={selectedOptions[opt.id] as string}
                  onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.id]: e.target.value }))}
                  placeholder={opt.placeholder}
                  rows={3}
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleGenerate} variant="default" size="sm">
            <RefreshCw className="size-4 mr-2" />
            Generate
          </Button>
        </div>

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Content</label>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="ghost" size="sm">
                  {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button onClick={handleDownload} variant="ghost" size="sm">
                  <Download className="size-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[250px] font-mono text-sm bg-muted/30"
            />
          </div>
        )}
      </div>
    );
  };
}
