import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function SlugChecker() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  const toSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const validateSlug = (slug: string): { valid: boolean; issues: string[] } => {
    const issues: string[] = [];

    if (!slug) {
      issues.push("Slug is empty");
    }
    if (slug !== slug.toLowerCase()) {
      issues.push("Contains uppercase characters");
    }
    if (/[^a-z0-9-]/.test(slug)) {
      issues.push("Contains invalid characters");
    }
    if (slug.startsWith("-") || slug.endsWith("-")) {
      issues.push("Starts or ends with hyphen");
    }
    if (slug.includes("--")) {
      issues.push("Contains consecutive hyphens");
    }
    if (slug.length < 3) {
      issues.push("Too short (minimum 3 characters)");
    }
    if (slug.length > 50) {
      issues.push("Too long (maximum 50 characters)");
    }

    return { valid: issues.length === 0, issues };
  };

  const slug = toSlug(input);
  const validation = checked ? validateSlug(slug) : null;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Text to Convert
        </Label>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setChecked(false);
          }}
          className="w-full rounded-xl border border-border bg-background p-3"
          placeholder="Enter text to convert to slug..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Generated Slug
        </Label>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 font-mono text-center">
          {slug || <span className="text-muted-foreground">Slug will appear here</span>}
        </div>
      </div>

      <button
        onClick={() => setChecked(true)}
        disabled={!slug}
        className="w-full rounded-xl bg-primary text-primary-foreground p-3 font-medium disabled:opacity-50"
      >
        Validate Slug
      </button>

      {validation && (
        <div
          className={`rounded-xl border p-4 ${
            validation.valid
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-destructive/30 bg-destructive/10"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {validation.valid ? (
              <CheckCircle className="size-5 text-emerald-500" />
            ) : (
              <XCircle className="size-5 text-destructive" />
            )}
            <span
              className={`font-semibold ${validation.valid ? "text-emerald-600" : "text-destructive"}`}
            >
              {validation.valid ? "Valid Slug" : "Invalid Slug"}
            </span>
          </div>
          {validation.issues.length > 0 && (
            <ul className="space-y-1 text-sm">
              {validation.issues.map((issue, i) => (
                <li key={i} className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="size-3" />
                  {issue}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">Slug Best Practices:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Use lowercase letters</li>
          <li>Use hyphens instead of underscores</li>
          <li>Avoid special characters</li>
          <li>Keep it descriptive and concise</li>
          <li>3-50 characters long</li>
        </ul>
      </div>
    </div>
  );
}
