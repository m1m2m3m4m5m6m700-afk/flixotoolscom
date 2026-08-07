import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, ArrowRightLeft } from "lucide-react";

export function BinaryConverter() {
  const [mode, setMode] = useState<"text" | "binary">("text");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const textToBinary = (text: string) =>
    text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");

  const binaryToText = (binary: string) => {
    try {
      return binary
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join("");
    } catch {
      return "";
    }
  };

  const output = mode === "text" ? textToBinary(input) : binaryToText(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === "text" ? "binary" : "text");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === "text" ? "default" : "outline"}
          onClick={() => setMode("text")}
          className="flex-1"
        >
          Text to Binary
        </Button>
        <Button
          variant={mode === "binary" ? "default" : "outline"}
          onClick={() => setMode("binary")}
          className="flex-1"
        >
          Binary to Text
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "text" ? "Enter Text" : "Enter Binary (space-separated)"}
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder={
            mode === "text" ? "Hello World" : "01001000 01100101 01101100 01101100 01101111"
          }
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "text" ? "Binary Output" : "Text Output"}
        </Label>
        <div className="min-h-[120px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm break-all">
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleSwap} className="flex-1">
          <ArrowRightLeft className="size-4 mr-2" />
          Swap
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!output} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
