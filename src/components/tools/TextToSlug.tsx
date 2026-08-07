import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function TextToSlug() {
  const [text, setText] = useState("Hello World, This Is A Test!");
  const [copied, setCopied] = useState(false);

  const toSlug = (str: string): string => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const slug = toSlug(text);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Text
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3"
          placeholder="Enter text to convert..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Generated Slug
        </Label>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center font-mono">
          {slug || <span className="text-muted-foreground">Slug will appear here</span>}
        </div>
      </div>

      <Button variant="outline" onClick={handleCopy} disabled={!slug} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy Slug"}
      </Button>

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">Transformations applied:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Lowercase conversion</li>
          <li>Special character removal</li>
          <li>Whitespace to hyphens</li>
          <li>Accent character normalization</li>
          <li>Leading/trailing hyphen removal</li>
        </ul>
      </div>
    </div>
  );
}
