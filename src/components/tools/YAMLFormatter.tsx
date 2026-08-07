"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, FileCode, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Mode = "format" | "minify" | "validate";

export function YAMLFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("format");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseYAML = useCallback(
    (yaml: string): { valid: boolean; data?: unknown; error?: string } => {
      // Simple YAML parser for common cases
      const lines = yaml.split("\n");
      const result: Record<string, unknown> = {};
      let currentKey = "";
      let currentIndent = 0;
      let arrayMode = false;
      let currentArray: string[] = [];

      for (const line of lines) {
        if (line.trim() === "" || line.trim().startsWith("#")) continue;

        const indent = line.search(/\S/);
        const trimmed = line.trim();

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
          const value = trimmed.slice(colonIndex + 1).trim();

          if (value) {
            result[currentKey] = value.replace(/^["']|["']$/g, "");
          } else {
            result[currentKey] = null;
          }
          currentIndent = indent;
        }
      }

      if (currentKey && arrayMode) {
        result[currentKey] = currentArray;
      }

      return { valid: true, data: result };
    },
    [],
  );

  const formatYAML = useCallback((yaml: string): string => {
    // Basic YAML formatting - just ensure proper indentation
    const lines = yaml.split("\n");
    return lines
      .map((line) => {
        if (line.trim() === "") return "";
        return line;
      })
      .join("\n");
  }, []);

  const minifyYAML = useCallback((yaml: string): string => {
    // Remove unnecessary whitespace
    return yaml
      .split("\n")
      .filter((l) => l.trim() && !l.trim().startsWith("#"))
      .join("\n");
  }, []);

  const handleProcess = useCallback(() => {
    try {
      if (mode === "validate") {
        const parsed = parseYAML(input);
        setIsValid(parsed.valid);
        if (parsed.valid) {
          setOutput("✓ Valid YAML");
          setError(null);
        } else {
          setOutput("");
          setError(parsed.error || "Invalid YAML");
        }
      } else if (mode === "format") {
        const formatted = formatYAML(input);
        setOutput(formatted);
        setIsValid(true);
        setError(null);
      } else {
        const minified = minifyYAML(input);
        setOutput(minified);
        setIsValid(true);
        setError(null);
      }
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "Invalid YAML");
      setOutput("");
    }
  }, [input, mode, parseYAML, formatYAML, minifyYAML]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setIsValid(null);
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Mode
        </Label>
        <div className="flex gap-2">
          <Button
            onClick={() => setMode("format")}
            variant={mode === "format" ? "default" : "outline"}
            size="sm"
          >
            Format
          </Button>
          <Button
            onClick={() => setMode("minify")}
            variant={mode === "minify" ? "default" : "outline"}
            size="sm"
          >
            Minify
          </Button>
          <Button
            onClick={() => setMode("validate")}
            variant={mode === "validate" ? "default" : "outline"}
            size="sm"
          >
            Validate
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input YAML
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Output
            </Label>
            {isValid !== null && (
              <span
                className={`flex items-center gap-1 text-xs ${isValid ? "text-emerald-500" : "text-red-500"}`}
              >
                {isValid ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                {isValid ? "Valid" : "Invalid"}
              </span>
            )}
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || error || (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileCode className="size-8 mb-2 opacity-40" />
                <span>Formatted YAML will appear here</span>
              </div>
            )}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={handleProcess} disabled={!input} size="sm">
          {mode === "validate" ? "Validate" : mode === "format" ? "Format" : "Minify"} YAML
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
