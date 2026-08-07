import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function SentenceCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toSentenceCase = (str: string): string => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const sentence = toSentenceCase(text);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examples = [
    "HELLO WORLD",
    "what is the weather",
    "i LOVE PROGRAMMING",
    "THIS IS A TEST. this is another sentence.",
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3"
          placeholder="Enter text to convert to sentence case..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Result
          </Label>
          <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!sentence}>
            {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="min-h-[100px] rounded-xl border border-primary/30 bg-primary/5 p-4">
          {sentence || <span className="text-muted-foreground">Result will appear here</span>}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Examples
        </Label>
        <div className="space-y-2">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-2 text-sm"
            >
              <span className="flex-1 text-muted-foreground line-through">{ex}</span>
              <span className="text-primary">→</span>
              <span className="flex-1 font-medium">{toSentenceCase(ex)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
