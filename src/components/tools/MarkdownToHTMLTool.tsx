"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Eye, FileCode, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const markdownToHtml = (md: string): string => {
  let html = md;

  // Handle code blocks first (before other processing)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Handle inline code
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

  // Handle headers
  html = html.replace(/^######\s+(.*)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.*)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.*)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.*)$/gm, "<h1>$1</h1>");

  // Handle bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");
  html = html.replace(/^---$/gm, "<hr>");

  // Handle links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Handle images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" style="max-width: 100%;">',
  );

  // Handle blockquotes
  html = html.replace(/^>\s+(.*)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Handle unordered lists
  html = html.replace(/^-\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Handle ordered lists
  html = html.replace(/^\d+\.\s+(.*)$/gm, "<li>$1</li>");

  // Handle paragraphs (preserve line breaks)
  html = html
    .split("\n\n")
    .map((para) => {
      if (para.match(/^<(h[1-6]|ul|ol|pre|blockquote|hr)/)) {
        return para;
      }
      if (para.trim()) {
        return `<p>${para.replace(/\n/g, "<br>")}</p>`;
      }
      return "";
    })
    .join("\n");

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, "");

  return html;
};

export function MarkdownToHTMLTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleConvert = useCallback(() => {
    setError(null);
    try {
      const html = markdownToHtml(input);
      setOutput(html);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  }, [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Markdown</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #666; }
    img { max-width: 100%; height: auto; }
    a { color: #0066cc; }
    hr { border: none; border-top: 1px solid #ddd; margin: 24px 0; }
  </style>
</head>
<body>
${output}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const sampleMarkdown = `# Hello World

This is a **bold** text and this is *italic*.

## Code Example

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

## Lists

- Item one
- Item two
- Item three

## Links

Visit [Flixo](https://flixo.com) for more tools.`;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Markdown Input
        </Label>
        <div className="flex items-center gap-2">
          <Button onClick={() => setInput(sampleMarkdown)} variant="ghost" size="sm">
            Try Sample
          </Button>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant={showPreview ? "default" : "outline"}
            size="sm"
          >
            <Eye className="size-4 mr-2" />
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Enter Markdown here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          {showPreview && output && (
            <div className="min-h-[200px] rounded-xl border border-border bg-background p-4 overflow-y-auto prose prose-sm max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          )}
          {!showPreview && (
            <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {output || error || (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <FileCode className="size-8 mb-2 opacity-40" />
                  <span>Converted HTML will appear here</span>
                </div>
              )}
            </div>
          )}
          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleConvert} disabled={!input} size="sm">
          <FileCode className="size-4 mr-2" />
          Convert to HTML
        </Button>
        {output && (
          <>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
              {copied ? "Copied!" : "Copy HTML"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Download HTML
            </Button>
          </>
        )}
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
