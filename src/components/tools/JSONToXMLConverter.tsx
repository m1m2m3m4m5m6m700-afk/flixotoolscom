import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, ArrowRightLeft } from "lucide-react";

function jsonToXml(json: string, rootName: string = "root"): string {
  try {
    const obj = JSON.parse(json);
    const convert = (value: unknown, name: string, indent: number): string => {
      const spaces = "  ".repeat(indent);
      if (value === null || value === undefined) {
        return `${spaces}<${name} />`;
      }
      if (typeof value !== "object") {
        return `${spaces}<${name}>${String(value)}</${name}>`;
      }
      if (Array.isArray(value)) {
        return `${spaces}<${name}>\n${value
          .map((item, i) => convert(item, name.replace(/s$/, ""), indent + 1))
          .join("\n")}\n${spaces}</${name}>`;
      }
      return `${spaces}<${name}>\n${Object.entries(value)
        .map(([k, v]) => convert(v, k, indent + 1))
        .join("\n")}\n${spaces}</${name}>`;
    };
    return `<?xml version="1.0" encoding="UTF-8"?>\n${convert(obj, rootName, 0)}`;
  } catch (e) {
    return "Invalid JSON";
  }
}

function xmlToJson(xml: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const parseNode = (node: Element): unknown => {
      if (node.children.length === 0) {
        return node.textContent || "";
      }
      const obj: Record<string, unknown> = {};
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const el = child as Element;
          const key = el.tagName;
          const value = parseNode(el);
          if (obj[key]) {
            if (!Array.isArray(obj[key])) {
              obj[key] = [obj[key]];
            }
            (obj[key] as unknown[]).push(value);
          } else {
            obj[key] = value;
          }
        }
      });
      return obj;
    };
    const result = parseNode(doc.documentElement);
    return JSON.stringify(result, null, 2);
  } catch {
    return "Invalid XML";
  }
}

export function JSONToXMLConverter() {
  const [mode, setMode] = useState<"jsonToXml" | "xmlToJson">("jsonToXml");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const output = mode === "jsonToXml" ? jsonToXml(input) : xmlToJson(input);

  const handleCopy = async () => {
    if (output !== "Invalid JSON" && output !== "Invalid XML") {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === "jsonToXml" ? "default" : "outline"}
          onClick={() => {
            setMode("jsonToXml");
            setError("");
          }}
          className="flex-1"
        >
          JSON → XML
        </Button>
        <Button
          variant={mode === "xmlToJson" ? "default" : "outline"}
          onClick={() => {
            setMode("xmlToJson");
            setError("");
          }}
          className="flex-1"
        >
          XML → JSON
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "jsonToXml" ? "JSON Input" : "XML Input"}
        </Label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder={
            mode === "jsonToXml"
              ? '{"name": "John", "age": 30}'
              : "<root>\n  <name>John</name>\n</root>"
          }
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === "jsonToXml" ? "XML Output" : "JSON Output"}
        </Label>
        <div
          className={`min-h-[150px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm overflow-auto ${
            output === "Invalid JSON" || output === "Invalid XML" ? "text-destructive" : ""
          }`}
        >
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={handleCopy}
        disabled={!output || output.startsWith("Invalid")}
        className="w-full"
      >
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy Output"}
      </Button>
    </div>
  );
}
