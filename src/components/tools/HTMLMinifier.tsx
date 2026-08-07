import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, Minimize2, AlignLeft, Code2 } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

export function HTMLMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{
    original: number;
    minified: number;
    savings: number;
  } | null>(null);

  const minify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    const originalSize = input.length;
    const minified = input
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Remove extra whitespace between tags
      .replace(/>\s+</g, "><")
      // Remove newlines and tabs
      .replace(/[\n\r\t]+/g, "")
      // Remove extra spaces
      .replace(/\s+/g, " ")
      // Trim
      .trim();

    const minifiedSize = minified.length;
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    setOutput(minified);
    setStats({
      original: originalSize,
      minified: minifiedSize,
      savings: parseFloat(savings),
    });
  }, [input]);

  const beautify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    let formatted = "";
    let indent = 0;
    const parts = input.replace(/></g, ">\n<").replace(/>\s+</g, ">\n<").split("\n");

    parts.forEach((part) => {
      part = part.trim();
      if (!part) return;

      if (part.startsWith("</")) {
        indent = Math.max(0, indent - 1);
      }

      formatted += "  ".repeat(indent) + part + "\n";

      if (
        part.startsWith("<") &&
        !part.startsWith("</") &&
        !part.startsWith("<?") &&
        !part.startsWith("<!") &&
        !part.endsWith("/>") &&
        !part.includes("</")
      ) {
        indent++;
      }
    });

    setOutput(formatted.trim());
    setStats(null);
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction("html-minifier", output.length, "html-minifier");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.html";
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction("minified.html", "text/html", "html-minifier");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats(null);
  };

  const handleLoadSample = () => {
    setInput(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <!-- This is a comment -->
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a sample HTML document.</p>
</body>
</html>`);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            HTML Input
          </Label>
          <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs h-6 px-2">
            Load sample
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your HTML code here..."
          className="min-h-[200px] rounded-xl font-mono text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={minify} disabled={!input.trim()} size="sm" className="flex-1">
          <Minimize2 className="mr-2 size-4" />
          Minify
        </Button>
        <Button
          onClick={beautify}
          disabled={!input.trim()}
          size="sm"
          variant="outline"
          className="flex-1"
        >
          <AlignLeft className="mr-2 size-4" />
          Beautify
        </Button>
        <Button onClick={handleClear} size="sm" variant="ghost">
          Clear
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex items-center justify-center gap-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">{stats.savings}%</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{stats.original.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Original chars</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{stats.minified.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Minified chars</p>
          </div>
        </div>
      )}

      {/* Output */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Output
        </Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Minified HTML will appear here..."
          className="min-h-[200px] rounded-xl bg-muted/30 font-mono text-sm"
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
