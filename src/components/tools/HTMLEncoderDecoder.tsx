import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function HTMLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === "encode") {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = input;
        setOutput(textarea.value);
      } else {
        const div = document.createElement("div");
        div.innerHTML = input;
        setOutput(div.innerText);
      }
    } catch {
      setOutput("Error processing HTML");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          Encode HTML
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          Decode HTML
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "encode" ? "Plain Text" : "HTML Entities"}
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder={
            mode === "encode"
              ? "<script>alert('XSS')</script>"
              : "&lt;script&gt;alert('XSS')&lt;/script&gt;"
          }
        />
      </div>

      <Button onClick={process} disabled={!input.trim()} className="w-full">
        {mode === "encode" ? "Encode" : "Decode"}
      </Button>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "encode" ? "HTML Entities" : "Plain Text"}
        </Label>
        <div className="min-h-[100px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm whitespace-pre-wrap break-all">
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
