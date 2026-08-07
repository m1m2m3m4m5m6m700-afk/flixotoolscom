import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function XMLFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      setError("");
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        throw new Error("Invalid XML");
      }
      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(doc);
      formatted = formatted
        .replace(/(>)(<\/*)([^<>])/g, (match, close, open, content) => {
          if (open === "</") return close + open + content;
          return close + "\n" + open + content;
        })
        .replace(/(<[^>]+>)([^<]+)(<\/[a-z]+>)/gi, (match, open, content, close) => {
          if (content.includes("\n")) return match;
          return open + "\n  " + content.trim() + "\n" + close;
        });
      setOutput(formatted.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid XML");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      setError("");
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        throw new Error("Invalid XML");
      }
      const serializer = new XMLSerializer();
      setOutput(serializer.serializeToString(doc).replace(/>\s+</g, "><").trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid XML");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          XML Input
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="<root><item>Hello</item></root>"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={format} disabled={!input.trim()} className="flex-1">
          Format
        </Button>
        <Button onClick={minify} disabled={!input.trim()} className="flex-1">
          Minify
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Output
        </Label>
        <div className="min-h-[120px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm whitespace-pre-wrap overflow-auto">
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      <Button variant="outline" onClick={handleCopy} disabled={!output} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
