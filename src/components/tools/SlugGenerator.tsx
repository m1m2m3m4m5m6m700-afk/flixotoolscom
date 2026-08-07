import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Check, AlertTriangle } from "lucide-react";

export function SlugGenerator() {
  const [text, setText] = useState("");

  const generateSlug = (input: string): string => {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const slug = generateSlug(text);

  const checks = [
    {
      label: "No uppercase letters",
      pass: !/[A-Z]/.test(text),
    },
    {
      label: "No special characters",
      pass: !/[^a-z0-9\s-]/.test(text),
    },
    {
      label: "No consecutive spaces",
      pass: !/\s{2,}/.test(text),
    },
    {
      label: "Slug is not empty",
      pass: slug.length > 0,
    },
    {
      label: "No leading/trailing hyphens",
      pass: !slug.startsWith("-") && !slug.endsWith("-"),
    },
  ];

  const allPass = checks.every((c) => c.pass);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text
        </Label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg"
          placeholder="Enter title or text to generate URL slug..."
        />
      </div>

      {slug && (
        <>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">Generated Slug</p>
            <p className="text-xl font-mono font-medium break-all">/{slug}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Validation Checks
            </Label>
            <div className="space-y-1">
              {checks.map(({ label, pass }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg border p-2 ${
                    pass
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-amber-500/30 bg-amber-500/10"
                  }`}
                >
                  {pass ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="size-4 text-amber-500" />
                  )}
                  <span className={`text-sm ${pass ? "text-emerald-600" : "text-amber-600"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
