import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, RefreshCw, ArrowRightLeft, Type, Minus, Hash } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

type CaseType = "lower" | "upper" | "sentence" | "title" | "camel" | "snake" | "kebab" | "constant";

const CASE_OPTIONS: { value: CaseType; label: string; icon: typeof Type }[] = [
  { value: "lower", label: "lowercase", icon: Type },
  { value: "upper", label: "UPPERCASE", icon: Hash },
  { value: "sentence", label: "Sentence case", icon: Type },
  { value: "title", label: "Title Case", icon: Type },
  { value: "camel", label: "camelCase", icon: Type },
  { value: "snake", label: "snake_case", icon: Minus },
  { value: "kebab", label: "kebab-case", icon: Minus },
  { value: "constant", label: "CONSTANT_CASE", icon: Hash },
];

function convertCase(text: string, caseType: CaseType): string {
  if (!text.trim()) return "";

  const words = text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-\s]+/g, " ")
    .split(" ")
    .filter(Boolean);

  switch (caseType) {
    case "lower":
      return text.toLowerCase();
    case "upper":
      return text.toUpperCase();
    case "sentence":
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case "title":
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    case "camel":
      return words
        .map((word, i) =>
          i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join("");
    case "snake":
      return words.map((w) => w.toLowerCase()).join("_");
    case "kebab":
      return words.map((w) => w.toLowerCase()).join("-");
    case "constant":
      return words.map((w) => w.toUpperCase()).join("_");
    default:
      return text;
  }
}

export function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeCase, setActiveCase] = useState<CaseType>("lower");

  const handleConvert = useCallback(
    (caseType: CaseType) => {
      setActiveCase(caseType);
      setOutput(convertCase(input, caseType));
    },
    [input],
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    setOutput(convertCase(value, activeCase));
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction("case-converter", output.length, "case-converter");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "case-converted.txt";
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction("case-converted.txt", "text/plain", "case-converter");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Case Type Selector */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select Case Type
        </Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CASE_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={activeCase === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleConvert(opt.value)}
              className="h-auto py-2 text-xs font-medium"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <Textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter or paste your text here..."
          className="min-h-[100px] rounded-xl"
        />
      </div>

      {/* Output */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Converted Result
          </Label>
          {output && (
            <span className="text-xs text-muted-foreground">{output.length} characters</span>
          )}
        </div>
        <div className="relative">
          <Textarea
            value={output}
            readOnly
            placeholder="Converted text will appear here..."
            className="min-h-[100px] rounded-xl bg-muted/30 font-mono"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[140px]"
        >
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[140px]"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
        <Button
          onClick={handleClear}
          disabled={!input && !output}
          variant="ghost"
          className="flex-1 min-w-[140px]"
        >
          <RefreshCw className="mr-2 size-4" />
          Clear
        </Button>
        <Button
          onClick={() => handleInputChange(input)}
          disabled={!input}
          variant="ghost"
          className="flex-1 min-w-[140px]"
        >
          <ArrowRightLeft className="mr-2 size-4" />
          Reconvert
        </Button>
      </div>
    </div>
  );
}
