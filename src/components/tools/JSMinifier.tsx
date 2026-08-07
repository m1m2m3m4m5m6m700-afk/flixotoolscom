import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function JSMinifier() {
  const [input, setInput] = useState(`function greet(name) {
    // Greet the user
    const message = "Hello, " + name + "!";
    console.log(message);
    return message;
}

const result = greet("World");`);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const minify = () => {
    const result = input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*;\s*/g, ";")
      .replace(/;\}/g, "}")
      .trim();
    setOutput(result);
  };

  const prettify = () => {
    const result = input
      .replace(/;/g, ";\n")
      .replace(/{/g, " {\n")
      .split("\n")
      .map((line) => "  " + line.trim())
      .join("\n")
      .trim();
    setOutput(result);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savings = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : 0;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            JavaScript Input
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[250px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Output
            </Label>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            className="min-h-[250px] w-full rounded-xl border border-primary/30 bg-primary/5 p-3 font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={minify} className="flex-1">
          Minify
        </Button>
        <Button variant="outline" onClick={prettify} className="flex-1">
          Prettify
        </Button>
      </div>

      {output && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-muted-foreground">Original</p>
            <p className="font-mono font-semibold">{originalSize} bytes</p>
          </div>
          <div>
            <p className="text-muted-foreground">Minified</p>
            <p className="font-mono font-semibold">{minifiedSize} bytes</p>
          </div>
          <div>
            <p className="text-muted-foreground">Savings</p>
            <p className="font-mono font-semibold text-emerald-500">{savings}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
