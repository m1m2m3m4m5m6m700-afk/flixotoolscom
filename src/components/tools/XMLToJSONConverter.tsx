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

type ConvertMode = "xml-to-json" | "json-to-xml";

const xmlToJsonRecursive = (node: Element): unknown => {
  const result: Record<string, unknown> = {};

  if (node.attributes.length > 0) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      result[`@${attr.name}`] = attr.value;
    }
  }

  if (node.childNodes.length > 0) {
    const children: Record<string, unknown[]> = {};
    let textContent = "";

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];

      if (child.nodeType === Node.TEXT_NODE) {
        textContent += child.textContent || "";
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const childElement = child as Element;
        const childName = childElement.tagName;
        const childValue = xmlToJsonRecursive(childElement);

        if (!children[childName]) {
          children[childName] = [];
        }
        children[childName].push(childValue);
      }
    }

    const trimmedText = textContent.trim();
    if (Object.keys(children).length > 0) {
      for (const [key, value] of Object.entries(children)) {
        if (value.length === 1 && trimmedText === "") {
          result[key] = value[0];
        } else {
          result[key] = value;
        }
      }
      if (trimmedText) {
        result["#text"] = trimmedText;
      }
    } else if (trimmedText) {
      return trimmedText;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
};

const xmlToJson = (xml: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Invalid XML");
  }

  const json = xmlToJsonRecursive(doc.documentElement);
  return JSON.stringify(json, null, 2);
};

const jsonToXmlRecursive = (name: string, value: unknown, indent: number): string => {
  const spaces = "  ".repeat(indent);

  if (value === null || value === undefined) {
    return `${spaces}<${name}></${name}>`;
  }

  if (typeof value === "boolean" || typeof value === "number") {
    return `${spaces}<${name}>${value}</${name}>`;
  }

  if (typeof value === "string") {
    const escaped = value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    return `${spaces}<${name}>${escaped}</${name}>`;
  }

  if (Array.isArray(value)) {
    return value.map((v) => jsonToXmlRecursive(name, v, indent)).join("\n");
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    let xml = `${spaces}<${name}`;

    const attrs: string[] = [];
    const childEntries: [string, unknown][] = [];

    for (const [key, val] of entries) {
      if (key.startsWith("@")) {
        attrs.push(`${key.slice(1)}="${val}"`);
      } else if (key !== "#text") {
        childEntries.push([key, val]);
      }
    }

    if (attrs.length > 0) {
      xml += " " + attrs.join(" ");
    }

    if (childEntries.length === 0) {
      xml += "></" + name + ">";
    } else {
      const textValue = (value as Record<string, unknown>)["#text"];
      if (typeof textValue === "string") {
        const text = textValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        xml += `>${text}</${name}>`;
      } else {
        xml += ">\n";
        for (const [key, val] of childEntries) {
          xml += "\n" + jsonToXmlRecursive(key, val, indent + 1);
        }
        xml += "\n" + spaces + `</${name}>`;
      }
    }

    return xml;
  }

  return `${spaces}<${name}>${String(value)}</${name}>`;
};

const jsonToXml = (json: string): string => {
  const obj = JSON.parse(json);
  return jsonToXmlRecursive("root", obj, 0);
};

export function XMLToJSONConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mode, setMode] = useState<ConvertMode>("xml-to-json");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    setError(null);
    try {
      if (mode === "xml-to-json") {
        const json = xmlToJson(input);
        setOutput(json);
      } else {
        const xml = jsonToXml(input);
        setOutput(xml);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  }, [input, mode]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const ext = mode === "xml-to-json" ? "json" : "xml";
    const blob = new Blob([output], { type: "text/plain" });
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
            onClick={() => setMode("xml-to-json")}
            variant={mode === "xml-to-json" ? "default" : "outline"}
            size="sm"
          >
            XML → JSON
          </Button>
          <Button
            onClick={() => setMode("json-to-xml")}
            variant={mode === "json-to-xml" ? "default" : "outline"}
            size="sm"
          >
            JSON → XML
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input ({mode === "xml-to-json" ? "XML" : "JSON"})
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "xml-to-json"
                ? "<root>\n  <item>value</item>\n</root>"
                : '{\n  "key": "value"\n}'
            }
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Output ({mode === "xml-to-json" ? "JSON" : "XML"})
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
