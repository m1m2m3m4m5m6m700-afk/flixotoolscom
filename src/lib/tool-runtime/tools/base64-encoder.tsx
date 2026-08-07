/**
 * Base64 Encoder/Decoder Tool
 * Encode and decode Base64 strings
 */
import { Lock } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCw, ArrowRightLeft } from "lucide-react";

export const base64EncoderTool = {
  id: "base64-encoder",
  slug: "base64-encoder",
  name: "Base64 Encoder",
  description: "Encode and decode Base64 strings. Perfect for encoding data for URLs, API calls, or embedding images in HTML.",
  icon: Lock,
  category: "developer" as const,
  tags: ["base64", "encode", "decode", "converter", "developer", "security"],
  status: "ready" as const,
  runtime: function Base64EncoderComponent() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const handleProcess = useCallback(() => {
      setError("");
      try {
        if (mode === "encode") {
          setOutput(btoa(unescape(encodeURIComponent(input))));
        } else {
          setOutput(decodeURIComponent(escape(atob(input))));
        }
      } catch (e) {
        setError((e as Error).message);
        setOutput("");
      }
    }, [input, mode]);

    const handleSwap = useCallback(() => {
      setInput(output);
      setOutput("");
      setMode(mode === "encode" ? "decode" : "encode");
      setError("");
    }, [output, mode]);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [output]);

    const handleClear = useCallback(() => {
      setInput("");
      setOutput("");
      setError("");
    }, []);

    return (
      <div className="space-y-6">
        <div className="flex gap-2 p-1 bg-muted/50 rounded-lg w-fit">
          <button
            onClick={() => setMode("encode")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "encode" ? "bg-background shadow-sm" : "hover:bg-muted"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "decode" ? "bg-background shadow-sm" : "hover:bg-muted"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{mode === "encode" ? "Plain Text" : "Base64"}</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{mode === "encode" ? "Base64 Output" : "Decoded Text"}</label>
            <Textarea
              value={output}
              readOnly
              placeholder={mode === "encode" ? "Encoded result..." : "Decoded result..."}
              className="min-h-[200px] font-mono text-sm bg-muted/30"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 text-sm">
            Error: {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleProcess} variant="default" size="sm">
            <RefreshCw className="size-4 mr-2" />
            {mode === "encode" ? "Encode" : "Decode"}
          </Button>
          <Button onClick={handleSwap} variant="outline" size="sm">
            <ArrowRightLeft className="size-4 mr-2" />
            Swap
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            Clear
          </Button>
          {output && (
            <Button onClick={handleCopy} variant="ghost" size="sm">
              {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
        </div>
      </div>
    );
  },
};

export default base64EncoderTool;
