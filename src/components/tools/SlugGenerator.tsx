import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, Link, Type } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

export function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSlug = useCallback(() => {
    if (!input.trim()) {
      setSlug("");
      return;
    }

    const generated = input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
      .substring(0, 100); // Limit length

    setSlug(generated);
  }, [input]);

  const handleCopy = async () => {
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
      trackCopyAction("slug-generator", slug.length, "slug-generator");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!slug) return;
    const blob = new Blob([slug], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slug.txt";
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction("slug.txt", "text/plain", "slug-generator");
  };

  const handleClear = () => {
    setInput("");
    setSlug("");
  };

  const examples = [
    "Hello World",
    "My Blog Post Title",
    "What's the best way?",
    "  Multiple   Spaces  ",
    "Special Characters: @#$%",
    "Émojis 🎉 and Accents",
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Title or Text
        </Label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a title to convert to URL slug..."
          className="h-12 text-lg"
        />
      </div>

      {/* Generate Button */}
      <Button onClick={generateSlug} disabled={!input.trim()} className="w-full">
        <Link className="mr-2 size-4" />
        Generate Slug
      </Button>

      {/* Slug Output */}
      {slug && (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Generated Slug
            </Label>
            <span className="text-xs text-muted-foreground">{slug.length}/100 chars</span>
          </div>
          <p className="font-mono text-lg break-all text-primary">{slug}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          disabled={!slug}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy Slug"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!slug}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
        <Button onClick={handleClear} variant="ghost" className="flex-1 min-w-[100px]">
          Clear
        </Button>
      </div>

      {/* Examples */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Try These Examples
        </Label>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <Button
              key={example}
              variant="outline"
              size="sm"
              onClick={() => setInput(example)}
              className="text-xs"
            >
              {example}
            </Button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-border/60 bg-surface/40 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">What is a URL slug?</p>
        <p>
          A URL slug is the part of a URL that identifies a specific page in a readable format. It's
          typically lowercase with hyphens replacing spaces, making it SEO-friendly and easy to
          share.
        </p>
      </div>
    </div>
  );
}
