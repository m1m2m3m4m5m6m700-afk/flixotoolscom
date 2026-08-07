/**
 * URL Encoder/Decoder Tool
 * Encode and decode URL strings
 */
import { Globe } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCw, ArrowRightLeft } from "lucide-react";

export const urlEncoderTool = {
  id: "url-encoder",
  slug: "url-encoder",
  name: "URL Encoder",
  description: "Encode and decode URL strings. Safely encode special characters for use in URLs and query parameters.",
  icon: Globe,
  category: "web" as const,
  tags: ["url", "encode", "decode", "uri", "percent", "encoding", "web"],
  status: "ready" as const,
  runtime: function UrlEncoderComponent() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);

    const handleProcess = useCallback(() => {
      try {
        if (mode === "encode") {
          setOutput(encodeURIComponent(input));
        } else {
          setOutput(decodeURIComponent(input));
        }
      } catch (e) {
        setOutput("Error: Invalid input");
      }
    }, [input, mode]);

    const handleSwap = useCallback(() => {
      setInput(output);
      setOutput("");
      setMode(mode === "encode" ? "decode" : "encode");
    }, [output, mode]);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [output]);

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
            <label className="text-sm font-medium">{mode === "encode" ? "Original URL" : "Encoded URL"}</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter URL to encode..." : "Enter encoded URL..."}
              className="min-h-[150px] font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{mode === "encode" ? "Encoded URL" : "Decoded URL"}</label>
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] font-mono text-sm bg-muted/30"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleProcess} variant="default" size="sm">
            <RefreshCw className="size-4 mr-2" />
            {mode === "encode" ? "Encode" : "Decode"}
          </Button>
          <Button onClick={handleSwap} variant="outline" size="sm">
            <ArrowRightLeft className="size-4 mr-2" />
            Swap
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

export default urlEncoderTool;
