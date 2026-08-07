import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, ArrowRightLeft, Globe, Link2 } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

export function URLEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput("Error: Invalid URL encoded string");
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction("url-encoder", output.length, "url-encoder");
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
    a.download = `${mode === "encode" ? "encoded" : "decoded"}-url.txt`;
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction(
      `${mode === "encode" ? "encoded" : "decoded"}-url.txt`,
      "text/plain",
      "url-encoder",
    );
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const handleLoadSample = () => {
    setInput("https://example.com/path?param=value&another=测试");
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
          <Link2 className="mr-2 size-4" />
          Encode URL
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          <Globe className="mr-2 size-4" />
          Decode URL
        </Button>
      </div>

      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {mode === "encode" ? "Original URL" : "Encoded URL"}
          </Label>
          <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs h-6 px-2">
            Load sample
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Enter URL to encode (e.g., https://example.com?q=hello world)..."
              : "Enter encoded URL to decode (e.g., https%3A%2F%2Fexample.com)..."
          }
          className="min-h-[100px] rounded-xl font-mono text-sm"
        />
      </div>

      {/* Process Button */}
      <Button onClick={handleProcess} disabled={!input.trim()} className="w-full">
        {mode === "encode" ? "Encode URL" : "Decode URL"}
      </Button>

      {/* Output */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "encode" ? "Encoded URL" : "Decoded URL"}
        </Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Result will appear here..."
          className="min-h-[100px] rounded-xl bg-muted/30 font-mono text-sm"
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
        <Button
          onClick={handleSwap}
          disabled={!output}
          variant="ghost"
          className="flex-1 min-w-[100px]"
        >
          <ArrowRightLeft className="mr-2 size-4" />
          Swap
        </Button>
      </div>
    </div>
  );
}
