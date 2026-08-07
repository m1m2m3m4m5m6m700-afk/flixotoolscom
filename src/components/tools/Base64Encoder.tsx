import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, ArrowRightLeft, AlertCircle } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleProcess = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch (err) {
      setError(
        mode === "encode"
          ? "Failed to encode. Please check your input."
          : "Failed to decode. Invalid Base64 string.",
      );
      setOutput("");
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction("base64-encoder", output.length, "base64-encoder");
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
    a.download = `${mode === "encode" ? "encoded" : "decoded"}-base64.txt`;
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction(
      `${mode === "encode" ? "encoded" : "decoded"}-base64.txt`,
      "text/plain",
      "base64-encoder",
    );
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Mode Selector */}
      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          Encode to Base64
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          Decode from Base64
        </Button>
      </div>

      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "encode" ? "Plain Text" : "Base64 String"}
        </Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Enter text to encode to Base64..."
              : "Enter Base64 string to decode..."
          }
          className="min-h-[120px] rounded-xl font-mono"
        />
      </div>

      {/* Process Button */}
      <Button onClick={handleProcess} disabled={!input.trim()} className="w-full">
        {mode === "encode" ? "Encode" : "Decode"}
      </Button>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Output */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
          </Label>
          {output && <span className="text-xs text-muted-foreground">{output.length} chars</span>}
        </div>
        <Textarea
          value={output}
          readOnly
          placeholder="Result will appear here..."
          className="min-h-[120px] rounded-xl bg-muted/30 font-mono"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[120px]"
        >
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[120px]"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
        <Button
          onClick={handleSwap}
          disabled={!output}
          variant="ghost"
          className="flex-1 min-w-[120px]"
        >
          <ArrowRightLeft className="mr-2 size-4" />
          Swap & Continue
        </Button>
      </div>
    </div>
  );
}
