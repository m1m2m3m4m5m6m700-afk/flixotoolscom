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

type ConvertMode = "json-to-yaml" | "yaml-to-json";

const convertToYaml = (obj: unknown, indent: number): string => {
  const spaces = "  ".repeat(indent);
  const nextSpaces = "  ".repeat(indent + 1);

  if (obj === null) return "null";
  if (obj === undefined) return "";
  if (typeof obj === "boolean") return obj ? "true" : "false";
  if (typeof obj === "number") return obj.toString();
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(":") || obj.includes("#")) {
      return `"${obj.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => {
        const value = convertToYaml(item, indent + 1);
        if (typeof item === "object" && item !== null) {
          return `${nextSpaces}- ${value}`;
        }
        return `${nextSpaces}- ${value}`;
      })
      .join("\n");
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries
      .map(([key, value]) => {
        const val = convertToYaml(value, indent + 1);
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          return `${nextSpaces}${key}:\n${val}`;
        }
        return `${nextSpaces}${key}: ${val}`;
      })
      .join("\n");
  }

  return String(obj);
};

const parseYaml = (yaml: string): unknown => {
  const lines = yaml.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
  const result: Record<string, unknown> = {};
  let currentKey = "";
  let arrayMode = false;
  let currentArray: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("- ")) {
      if (!arrayMode) {
        if (currentKey) {
          result[currentKey] = currentArray.length > 0 ? [...currentArray] : null;
        }
        arrayMode = true;
        currentArray = [];
      }
      currentArray.push(trimmed.slice(2).trim());
    } else if (trimmed.includes(":")) {
      if (arrayMode && currentKey) {
        result[currentKey] = currentArray.length > 0 ? [...currentArray] : null;
        arrayMode = false;
        currentArray = [];
      }

      const colonIndex = trimmed.indexOf(":");
      currentKey = trimmed.slice(0, colonIndex).trim();
      let value: unknown = trimmed.slice(colonIndex + 1).trim();

      if (value === "" || value === "null" || value === "~") {
        value = null;
      } else if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      } else if (!isNaN(Number(value)) && value !== "") {
        value = Number(value);
      } else if (typeof value === "string") {
        value = value.replace(/^["']|["']$/g, "");
      }

      result[currentKey] = value;
    }
  }

  if (currentKey && arrayMode) {
    result[currentKey] = currentArray;
  }

  return result;
};

export function JSONToYAMLConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mode, setMode] = useState<ConvertMode>("json-to-yaml");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    setError(null);
    try {
      if (mode === "json-to-yaml") {
        const obj = JSON.parse(input);
        setOutput(convertToYaml(obj, 0));
      } else {
        const obj = parseYaml(input);
        setOutput(JSON.stringify(obj, null, 2));
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
    const ext = mode === "json-to-yaml" ? "yaml" : "json";
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
            onClick={() => setMode("json-to-yaml")}
            variant={mode === "json-to-yaml" ? "default" : "outline"}
            size="sm"
          >
            JSON → YAML
          </Button>
          <Button
            onClick={() => setMode("yaml-to-json")}
            variant={mode === "yaml-to-json" ? "default" : "outline"}
            size="sm"
          >
            YAML → JSON
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input ({mode === "json-to-yaml" ? "JSON" : "YAML"})
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "json-to-yaml" ? '{"key": "value"}' : "key: value"}
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Output ({mode === "json-to-yaml" ? "YAML" : "JSON"})
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
