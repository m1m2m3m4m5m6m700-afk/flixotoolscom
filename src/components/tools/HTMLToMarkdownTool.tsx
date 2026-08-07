"use client";

import { useState, useCallback } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Download,
  ArrowRightLeft,
  FileCode,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ConvertMode = "html-to-md" | "md-to-html";

export function HTMLToMarkdownTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mode, setMode] = useState<ConvertMode>("html-to-md");
  const [error, setError] = useState<string | null>(null);

  const htmlToMarkdown = useCallback((html: string): string => {
    let md = html;

    // Handle headers
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, (_, content) => `# ${content.trim()}\n\n`);
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_, content) => `## ${content.trim()}\n\n`);
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, (_, content) => `### ${content.trim()}\n\n`);
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, (_, content) => `#### ${content.trim()}\n\n`);
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, (_, content) => `##### ${content.trim()}\n\n`);
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, (_, content) => `###### ${content.trim()}\n\n`);

    // Handle bold
    md = md.replace(
      /<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi,
      (_tag, _tag2, content) => `**${content.trim()}**`,
    );

    // Handle italic
    md = md.replace(
      /<(em|i)[^>]*>(.*?)<\/(em|i)>/gi,
      (_tag, _tag2, content) => `*${content.trim()}*`,
    );

    // Handle code (inline)
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, (_, content) => `\`${content.trim()}\``);

    // Handle code blocks
    md = md.replace(
      /<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis,
      (_, content) => `\`\`\`\n${content.trim()}\n\`\`\`\n\n`,
    );

    // Handle links
    md = md.replace(
      /<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi,
      (_, href, content) => `[${content.trim()}](${href})`,
    );

    // Handle images
    md = md.replace(
      /<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi,
      (_, src, alt) => `![${alt}](${src})`,
    );
    md = md.replace(
      /<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi,
      (_, alt, src) => `![${alt}](${src})`,
    );
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, (_, src) => `![](${src})`);

    // Handle horizontal rules
    md = md.replace(/<hr\s*\/?>/gi, `\n---\n\n`);

    // Handle blockquotes
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, content) => {
      const lines = content
        .trim()
        .split("\n")
        .map((line: string) => `> ${line}`)
        .join("\n");
      return `${lines}\n\n`;
    });

    // Handle unordered lists
    md = md.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (_: unknown, content: string) => {
      const items = content
        .replace(/<li[^>]*>(.*?)<\/li>/gi, (_tag: unknown, item: string) => `- ${item.trim()}`)
        .trim();
      return `${items}\n\n`;
    });

    // Handle ordered lists
    md = md.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (_: unknown, content: string) => {
      let index = 0;
      const items = content
        .replace(
          /<li[^>]*>(.*?)<\/li>/gi,
          (_tag: unknown, item: string) => `${++index}. ${item.trim()}`,
        )
        .trim();
      return `${items}\n\n`;
    });

    // Handle line breaks
    md = md.replace(/<br\s*\/?>/gi, "\n");

    // Handle paragraphs
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, (_, content) => `${content.trim()}\n\n`);

    // Handle divs (treat as paragraphs)
    md = md.replace(/<div[^>]*>(.*?)<\/div>/gi, (_, content) => `${content.trim()}\n\n`);

    // Handle spans (remove tags, keep content)
    md = md.replace(/<span[^>]*>(.*?)<\/span>/gi, (_, content) => content);

    // Remove remaining HTML tags
    md = md.replace(/<[^>]+>/g, "");

    // Decode HTML entities
    md = md.replace(/&nbsp;/g, " ");
    md = md.replace(/&amp;/g, "&");
    md = md.replace(/&lt;/g, "<");
    md = md.replace(/&gt;/g, ">");
    md = md.replace(/&quot;/g, '"');
    md = md.replace(/&#39;/g, "'");
    md = md.replace(/&nbsp;/g, " ");

    // Clean up multiple newlines
    md = md.replace(/\n{3,}/g, "\n\n");

    // Trim whitespace
    md = md.trim();

    return md;
  }, []);

  const markdownToHtml = useCallback((md: string): string => {
    let html = md;

    // Handle code blocks first (before other processing)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Handle inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

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

    // Handle links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Handle images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Handle horizontal rules
    html = html.replace(/^---$/gm, "<hr>");

    // Handle blockquotes
    html = html.replace(/^>\s+(.*)$/gm, "<blockquote><p>$1</p></blockquote>");

    // Handle unordered lists
    html = html.replace(/^-\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

    // Handle ordered lists
    html = html.replace(/^\d+\.\s+(.*)$/gm, "<li>$1</li>");

    // Handle paragraphs (simple line breaks become paragraphs)
    html = html.replace(/\n\n+/g, "</p><p>");
    html = `<p>${html}</p>`;

    // Handle single line breaks
    html = html.replace(/<\/p>\n<p>/g, "</p><p>");
    html = html.replace(/<p><\/p>/g, "");

    // Clean up
    html = html.replace(/<p><h/g, "<h");
    html = html.replace(/<\/h(\d)><\/p>/g, "</h$1>");
    html = html.replace(/<p><ul>/g, "<ul>");
    html = html.replace(/<\/ul><\/p>/g, "</ul>");
    html = html.replace(/<p><blockquote>/g, "<blockquote>");
    html = html.replace(/<\/blockquote><\/p>/g, "</blockquote>");
    html = html.replace(/<p><hr><\/p>/g, "<hr>");
    html = html.replace(/<p><pre>/g, "<pre>");
    html = html.replace(/<\/pre><\/p>/g, "</pre>");

    return html;
  }, []);

  const handleConvert = useCallback(() => {
    setError(null);
    try {
      if (mode === "html-to-md") {
        setOutput(htmlToMarkdown(input));
      } else {
        setOutput(markdownToHtml(input));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  }, [input, mode, htmlToMarkdown, markdownToHtml]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const ext = mode === "html-to-md" ? "md" : "html";
    const mime = mode === "html-to-md" ? "text/markdown" : "text/html";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Conversion Mode
        </Label>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setMode("html-to-md")}
            variant={mode === "html-to-md" ? "default" : "outline"}
            size="sm"
          >
            HTML → Markdown
          </Button>
          <Button
            onClick={() => setMode("md-to-html")}
            variant={mode === "md-to-html" ? "default" : "outline"}
            size="sm"
          >
            Markdown → HTML
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "html-to-md"
                ? "<h1>Hello World</h1>\n<p>This is a <strong>test</strong>.</p>"
                : "# Hello World\n\nThis is a **test**."
            }
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Output
          </Label>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || error || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileCode className="size-8 mb-2 opacity-40" />
                <span>Converted result will appear here</span>
              </div>
            )}
          </div>
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
          <ArrowRightLeft className="size-4 mr-2" />
          Convert
        </Button>
        {output && (
          <>
            <Button onClick={() => handleCopy(output)} variant="outline" size="sm">
              {copied === output ? (
                <Check className="size-4 mr-2" />
              ) : (
                <Copy className="size-4 mr-2" />
              )}
              {copied === output ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Download
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
