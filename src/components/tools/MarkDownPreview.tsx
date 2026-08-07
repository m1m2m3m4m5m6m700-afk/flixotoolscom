import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, FileText } from "lucide-react";

const DEFAULT_MD = `# Welcome to Markdown Preview

## Features

- **Bold** and *italic* text
- Lists:
  1. First item
  2. Second item
  3. Third item

- Code blocks:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote

[Link to Flixo](https://flixo.tools)

![Alt text](https://via.placeholder.com/150)

---

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;

function parseMarkdown(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headers
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener">$1</a>',
    )
    // Images
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />',
    )
    // Blockquotes
    .replace(
      /^> (.*$)/gm,
      '<blockquote class="border-l-4 border-primary pl-4 italic my-2">$1</blockquote>',
    )
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-6 border-border" />')
    // Code blocks (fenced)
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>',
    )
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Lists
    .replace(/^- (.*$)/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.*$)/gm, "<li>$2</li>")
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="my-4">')
    // Line breaks
    .replace(/\n/g, "<br />");

  // Wrap in paragraph
  html = '<p class="my-4">' + html + "</p>";

  // Clean up empty paragraphs
  html = html.replace(/<p class="my-4"><br \/><\/p>/g, "");

  return html;
}

export function MarkDownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Markdown
            </label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="min-h-[400px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </label>
          <div
            className="min-h-[400px] rounded-xl border border-border bg-background p-4 overflow-auto"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
