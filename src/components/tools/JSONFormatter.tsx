import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, AlignLeft, Braces, AlertCircle } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

export function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : "Unknown error"}`);
      setOutput("");
    }
  }, [input, indent]);

  const handleMinify = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : "Unknown error"}`);
      setOutput("");
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("Enter JSON to validate");
      return;
    }

    try {
      JSON.parse(input);
      setOutput("✓ Valid JSON");
    } catch (err) {
      setError(`✗ Invalid JSON: ${err instanceof Error ? err.message : "Unknown error"}`);
      setOutput("");
    }
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction("json-formatter", output.length, "json-formatter");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction("formatted.json", "application/json", "json-formatter");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleLoadSample = () => {
    setInput(
      `{"name":"John","age":30,"city":"New York","skills":["JavaScript","TypeScript","React"]}`,
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Indent Selector */}
      <div className="flex items-center gap-4">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
          Indent
        </Label>
        <div className="flex gap-2">
          {[2, 4].map((size) => (
            <Button
              key={size}
              variant={indent === size ? "default" : "outline"}
              size="sm"
              onClick={() => setIndent(size)}
            >
              {size} spaces
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Input JSON
          </Label>
          <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs h-6 px-2">
            Load sample
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="min-h-[150px] rounded-xl font-mono text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleFormat} disabled={!input.trim()} size="sm" className="flex-1">
          <AlignLeft className="mr-2 size-4" />
          Format
        </Button>
        <Button onClick={handleMinify} disabled={!input.trim()} size="sm" className="flex-1">
          <Braces className="mr-2 size-4" />
          Minify
        </Button>
        <Button
          onClick={handleValidate}
          disabled={!input.trim()}
          size="sm"
          variant="outline"
          className="flex-1"
        >
          <AlertCircle className="mr-2 size-4" />
          Validate
        </Button>
        <Button onClick={handleClear} size="sm" variant="ghost">
          Clear
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <code className="text-xs whitespace-pre-wrap">{error}</code>
        </div>
      )}

      {/* Output */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Output
          </Label>
          {output && output !== "✓ Valid JSON" && (
            <span className="text-xs text-muted-foreground">
              {output.split("\n").length} lines • {output.length} chars
            </span>
          )}
        </div>
        <Textarea
          value={output}
          readOnly
          placeholder="Formatted JSON will appear here..."
          className="min-h-[150px] rounded-xl bg-muted/30 font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
