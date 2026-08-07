import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, AlertCircle, CheckCircle2, Flag, X } from "lucide-react";
import { trackCopyAction } from "@/lib/analytics";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [copied, setCopied] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [], isValid: true, error: "" };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches: Array<{ index: number; text: string; groups?: Record<string, string> }> = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.groups,
          });
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.groups,
          });
        }
      }

      return { matches, isValid: true, error: "" };
    } catch (err) {
      return {
        matches: [],
        isValid: false,
        error: err instanceof Error ? err.message : "Invalid regex",
      };
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!result.isValid || result.matches.length === 0 || !testString) {
      return testString;
    }

    const parts: Array<{ text: string; isMatch: boolean }> = [];
    let lastIndex = 0;

    result.matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
      }
      parts.push({ text: match.text, isMatch: true });
      lastIndex = match.index + match.text.length;
    });

    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), isMatch: false });
    }

    return parts;
  }, [result, testString]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, "") : prev + flag));
  };

  const handleCopy = async () => {
    if (!pattern) return;
    try {
      await navigator.clipboard.writeText(`/${pattern}/${flags}`);
      trackCopyAction("regex-tester", pattern.length, "regex-tester");
      setCopied("pattern");
      setTimeout(() => setCopied(""), 1600);
    } catch {
      // Ignore
    }
  };

  const handleLoadSample = () => {
    setPattern("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
    setFlags("g");
    setTestString(
      "Contact us at support@example.com or sales@company.org. Invalid: not-an-email, @missing.com",
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Pattern Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Regular Expression
          </Label>
          <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs h-6 px-2">
            Load sample
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern (e.g., \d+)"
            className="font-mono text-sm flex-1"
          />
          <Button onClick={handleCopy} variant="outline" size="icon">
            {copied === "pattern" ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Flags */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Flags
        </Label>
        <div className="flex flex-wrap gap-2">
          {[
            { flag: "g", label: "g", description: "Global" },
            { flag: "i", label: "i", description: "Case insensitive" },
            { flag: "m", label: "m", description: "Multiline" },
            { flag: "s", label: "s", description: "Dotall" },
            { flag: "u", label: "u", description: "Unicode" },
          ].map(({ flag, label, description }) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                flags.includes(flag)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface/40 text-muted-foreground hover:border-primary/50"
              }`}
              title={description}
            >
              <span className="font-mono">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Test String */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Test String
        </Label>
        <Textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against the regex..."
          className="min-h-[120px] rounded-xl"
        />
      </div>

      {/* Results */}
      {result.error && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <code className="text-xs">{result.error}</code>
        </div>
      )}

      {/* Highlighted Result */}
      {testString && result.isValid && (
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Highlighted Matches
          </Label>
          <div className="rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm whitespace-pre-wrap break-all">
            {Array.isArray(highlightedText) ? (
              highlightedText.map((part, i) =>
                part.isMatch ? (
                  <mark
                    key={i}
                    className="rounded bg-yellow-200 px-0.5 text-yellow-900 dark:bg-yellow-900/50 dark:text-yellow-200"
                  >
                    {part.text}
                  </mark>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )
            ) : (
              <span>{highlightedText}</span>
            )}
          </div>
        </div>
      )}

      {/* Match List */}
      {result.matches.length > 0 && (
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Matches ({result.matches.length})
          </Label>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {result.matches.map((match, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    #{i + 1}
                  </span>
                  <code className="font-mono text-sm">{match.text}</code>
                </div>
                <span className="text-xs text-muted-foreground">Index: {match.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/40 p-3">
        {result.isValid ? (
          <>
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Valid regex pattern
            </span>
            <span className="text-sm text-muted-foreground">
              {result.matches.length === 0
                ? "No matches found"
                : `${result.matches.length} match${result.matches.length === 1 ? "" : "es"} found`}
            </span>
          </>
        ) : (
          <>
            <X className="size-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Invalid pattern</span>
          </>
        )}
      </div>
    </div>
  );
}
