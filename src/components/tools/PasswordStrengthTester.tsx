import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Check, X, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

function calculateStrength(password: string) {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lengthStrong: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
  };

  if (checks.length) score += 1;
  if (checks.lengthStrong) score += 1;
  if (checks.lowercase) score += 1;
  if (checks.uppercase) score += 1;
  if (checks.numbers) score += 1;
  if (checks.symbols) score += 1;

  let strength = "Weak";
  let color = "text-destructive";

  if (score >= 5) {
    strength = "Strong";
    color = "text-emerald-500";
  } else if (score >= 3) {
    strength = "Medium";
    color = "text-amber-500";
  }

  return { score, checks, strength, color };
}

export function PasswordStrengthTester() {
  const [password, setPassword] = useState("");

  const result = useMemo(() => calculateStrength(password), [password]);

  const getStrengthIcon = () => {
    if (result.strength === "Strong") return <ShieldCheck className="size-8 text-emerald-500" />;
    if (result.strength === "Medium") return <Shield className="size-8 text-amber-500" />;
    return <ShieldAlert className="size-8 text-destructive" />;
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Password
        </Label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter password to test strength..."
        />
      </div>

      {password && (
        <>
          <div className="flex items-center justify-center gap-4 py-4">
            {getStrengthIcon()}
            <div>
              <p className={`text-2xl font-bold ${result.color}`}>{result.strength}</p>
              <p className="text-sm text-muted-foreground">Score: {result.score}/6</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full transition-all ${
                  result.strength === "Strong"
                    ? "bg-emerald-500"
                    : result.strength === "Medium"
                      ? "bg-amber-500"
                      : "bg-destructive"
                }`}
                style={{ width: `${(result.score / 6) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid gap-2">
            {[
              { key: "length", label: "At least 8 characters" },
              { key: "lengthStrong", label: "At least 12 characters" },
              { key: "lowercase", label: "Contains lowercase letter" },
              { key: "uppercase", label: "Contains uppercase letter" },
              { key: "numbers", label: "Contains number" },
              { key: "symbols", label: "Contains special character" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                {result.checks[key as keyof typeof result.checks] ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <X className="size-4 text-destructive" />
                )}
                <span
                  className={
                    result.checks[key as keyof typeof result.checks]
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  }
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
