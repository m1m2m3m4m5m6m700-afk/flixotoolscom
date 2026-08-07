import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function HTMLToReactConverter() {
  const [html, setHtml] = useState(
    '<div className="container">\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</div>',
  );
  const [copied, setCopied] = useState(false);

  const convertToReact = (html: string): string => {
    const result = html
      // class -> className
      .replace(/class=/g, "className=")
      // for -> htmlFor
      .replace(/for=/g, "htmlFor=")
      // Self-closing tags
      .replace(
        /<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr)([^>]*)\/>/gi,
        "<$1$2 />",
      )
      // Convert style strings to objects
      .replace(/style="([^"]*)"/g, (_: string, styles: string) => {
        const styleObj = styles.split(";").reduce<Record<string, string>>((acc, s) => {
          const [prop, value] = s.split(":").map((p) => p.trim());
          if (prop && value) {
            const camelProp = prop.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
            return { ...acc, [camelProp]: value };
          }
          return acc;
        }, {});
        return `style={${JSON.stringify(styleObj)}}`;
      });

    return result;
  };

  const reactCode = convertToReact(html);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(reactCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
        Converts basic HTML to JSX/React syntax. Complex conversions may need manual adjustments.
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            HTML Input
          </label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="min-h-[300px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              React/JSX Output
            </label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <textarea
            value={reactCode}
            readOnly
            className="min-h-[300px] w-full rounded-xl border border-primary/30 bg-primary/5 p-3 font-mono text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">Conversions Applied:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            <code>class</code> → <code>className</code>
          </li>
          <li>
            <code>for</code> → <code>htmlFor</code>
          </li>
          <li>Self-closing tags properly formatted</li>
          <li>Inline styles converted to style objects</li>
        </ul>
      </div>
    </div>
  );
}
