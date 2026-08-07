import { useState } from "react";
import { Label } from "@/components/ui/label";

const PATTERNS = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*" },
  { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-\\s.]?\\d{3}[-\\s.]?\\d{4}" },
  { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])" },
  { name: "Time (HH:MM)", pattern: "(?:[01]\\d|2[0-3]):[0-5]\\d" },
  { name: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
  { name: "Credit Card", pattern: "\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b" },
  {
    name: "Password (strong)",
    pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
  },
  { name: "Username", pattern: "^[a-zA-Z][a-zA-Z0-9_]{2,15}$" },
];

export function RegexGenerator() {
  const [selectedPattern, setSelectedPattern] = useState<string>("");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);

  const handlePatternSelect = (pattern: string) => {
    setSelectedPattern(pattern);
    if (testString && pattern) {
      try {
        const regex = new RegExp(pattern, "g");
        const found = testString.match(regex) || [];
        setMatches(found);
      } catch {
        setMatches([]);
      }
    } else {
      setMatches([]);
    }
  };

  const handleTestStringChange = (value: string) => {
    setTestString(value);
    if (value && selectedPattern) {
      try {
        const regex = new RegExp(selectedPattern, "g");
        const found = value.match(regex) || [];
        setMatches(found);
      } catch {
        setMatches([]);
      }
    } else {
      setMatches([]);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Common Patterns
        </Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {PATTERNS.map(({ name, pattern }) => (
            <button
              key={name}
              onClick={() => handlePatternSelect(pattern)}
              className={`rounded-lg border p-2 text-left text-sm transition-colors ${
                selectedPattern === pattern
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface/40 hover:bg-surface/60"
              }`}
            >
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedPattern && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Regex Pattern
          </Label>
          <code className="block rounded-lg bg-muted/50 p-3 text-sm font-mono break-all">
            /{selectedPattern}/g
          </code>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Test String
        </Label>
        <textarea
          value={testString}
          onChange={(e) => handleTestStringChange(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text to test against the pattern..."
        />
      </div>

      {matches.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Matches ({matches.length})
          </Label>
          <div className="flex flex-wrap gap-2">
            {matches.map((match, i) => (
              <span
                key={i}
                className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 text-sm font-mono text-emerald-600"
              >
                {match}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
