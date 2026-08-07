import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function CaseTransformer() {
  const [input, setInput] = useState("hello_world_example");
  const [copied, setCopied] = useState<string | null>(null);

  const transform = (str: string, type: string): string => {
    if (!str) return "";
    switch (type) {
      case "camel":
        return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
      case "pascal":
        return str
          .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
          .replace(/^./, (s) => s.toUpperCase());
      case "snake":
        return str
          .replace(/([A-Z])/g, "_$1")
          .replace(/[-\s]+/g, "_")
          .toLowerCase()
          .replace(/^_/, "");
      case "kebab":
        return str
          .replace(/([A-Z])/g, "-$1")
          .replace(/[_\s]+/g, "-")
          .toLowerCase()
          .replace(/^-/, "");
      case "constant":
        return str
          .replace(/([A-Z])/g, "_$1")
          .replace(/[-\s]+/g, "_")
          .toUpperCase()
          .replace(/^_/, "");
      case "lower":
        return str.toLowerCase();
      case "upper":
        return str.toUpperCase();
      case "title":
        return str.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
        );
      case "sentence":
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      default:
        return str;
    }
  };

  const cases = [
    { id: "camel", label: "camelCase" },
    { id: "pascal", label: "PascalCase" },
    { id: "snake", label: "snake_case" },
    { id: "kebab", label: "kebab-case" },
    { id: "constant", label: "CONSTANT_CASE" },
    { id: "lower", label: "lowercase" },
    { id: "upper", label: "UPPERCASE" },
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
  ];

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-4 font-mono"
          placeholder="Enter text to transform..."
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {cases.map(({ id, label }) => {
          const result = transform(input, id);
          return (
            <div key={id} className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">{label}</span>
                <button
                  onClick={() => handleCopy(result)}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  {copied === result ? <Check className="size-3" /> : <Copy className="size-3" />}
                </button>
              </div>
              <p className="font-mono text-sm truncate">{result || "-"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
