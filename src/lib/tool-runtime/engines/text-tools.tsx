/**
 * Reusable Text Processing Tool Engine
 * Generic component for text manipulation tools
 */
import { useState, useCallback, useMemo } from "react";
import { Copy, Download, RefreshCw, Check } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextToolConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  process: (input: string, options?: Record<string, unknown>) => string;
  options?: Array<{
    id: string;
    label: string;
    type: "select" | "checkbox" | "input";
    options?: string[];
    default?: unknown;
  }>;
  placeholder?: string;
  minHeight?: string;
}

export function createTextTool(config: TextToolConfig) {
  return function TextToolComponent() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, unknown>>(
      config.options?.reduce((acc, opt) => {
        acc[opt.id] = opt.default;
        return acc;
      }, {} as Record<string, unknown>) || {}
    );

    const handleProcess = useCallback(() => {
      const result = config.process(input, selectedOptions);
      setOutput(result);
    }, [input, selectedOptions, config]);

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
      a.download = `${config.id}-result.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, [output, config.id]);

    const handleClear = useCallback(() => {
      setInput("");
      setOutput("");
    }, []);

    const stats = useMemo(() => ({
      characters: input.length,
      words: input.trim() ? input.trim().split(/\s+/).length : 0,
      lines: input.split("\n").length,
      paragraphs: input.split(/\n\n+/).filter(p => p.trim()).length,
    }), [input]);

    return (
      <div className="space-y-6">
        {/* Options */}
        {config.options && config.options.length > 0 && (
          <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
            {config.options.map((opt) => (
              <div key={opt.id} className="flex flex-col gap-1">
                <label className="text-sm font-medium">{opt.label}</label>
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
                {opt.type === "checkbox" && (
                  <input
                    type="checkbox"
                    checked={selectedOptions[opt.id] as boolean}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.id]: e.target.checked }))}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="space-y-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder || "Enter text here..."}
            className="min-h-[200px] font-mono text-sm"
            style={{ minHeight: config.minHeight || "200px" }}
          />
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>{stats.characters} chars</span>
            <span>•</span>
            <span>{stats.words} words</span>
            <span>•</span>
            <span>{stats.lines} lines</span>
            <span>•</span>
            <span>{stats.paragraphs} paragraphs</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleProcess} variant="default" size="sm">
            <RefreshCw className="size-4 mr-2" />
            Process
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            Clear
          </Button>
        </div>

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Result</label>
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
              className="min-h-[200px] font-mono text-sm bg-muted/30"
              style={{ minHeight: config.minHeight || "200px" }}
            />
          </div>
        )}
      </div>
    );
  };
}
